import { test, expect } from '@jest/globals'
import initSqlJs, { Database } from 'sql.js'
import { dqlTasks } from '../Tasks/DQLTasks'
import { ddlTasks } from '../Tasks/DDLTasks'
import { dmlTasks } from '../Tasks/DMLTasks'
import { validateDQLInput } from '../Util/dqlValidators'
import { validateDDLInput } from '../Util/ddlValidators'
import { validateDMLInput } from '../Util/dmlValidators'
import fs from 'fs'
import path from 'path'
import { Task } from '../Types/Task'
import { SCHEMA_OPTIONS } from '../Util/useSchemaOptions'

const loadedDatabases: { [schema: string]: Database } = {}

async function getDatabase(schema: string): Promise<Database> {
    if (schema in loadedDatabases) {
        return loadedDatabases[schema]
    }

    // Prepare sql.js from wasm file
    const sqlWasm = fs.readFileSync(
        path.resolve(__dirname, '../../node_modules/sql.js/dist/sql-wasm.wasm'))
    const SQL = await initSqlJs({ wasmBinary: sqlWasm.buffer })

    // Load the database for this schema
    const rawDBFile = fs.readFileSync(
        path.resolve(__dirname, `../../public/db/${schema}.db`))
    const database = new SQL.Database(rawDBFile)
    loadedDatabases[schema] = database
    return database
}

function makeTestForTask(task: Task, topic: 'dql'|'ddl'|'dml') {
    if (!SCHEMA_OPTIONS.map(opt => opt.toLowerCase()).includes(task.schema)) {
        // Ignore schemas that aren't available to the user
        return
    }

    const testDescription = `${topic.toUpperCase()} task ${task.id} on schema '${task.schema}'

Task: ${task.text}

Attempted solution: ${task.solutionQuery}
`

    test(testDescription, async () => {
        const database = await getDatabase(task.schema)

        let result: { isValid: boolean, feedback?: string }
        if (topic === 'dql') {
            const solutionTable = database.exec(task.solutionQuery)[0]
            if (solutionTable) {
                result = validateDQLInput(solutionTable, solutionTable)
            } else {
                // Currently treating solutions with no results as valid
                result = { isValid: true, feedback: undefined }
            }
        } else if (topic === 'ddl') {
            result = validateDDLInput(task.solutionQuery, task, database)
        } else {
            result = validateDMLInput(task.solutionQuery, task, database)
        }

        expect(result.feedback).toBeUndefined()
        expect(result.isValid).toBe(true)
    })
}

for (const task of dqlTasks) {
    makeTestForTask(task, 'dql')
}

for (const task of ddlTasks) {
    makeTestForTask(task, 'ddl')
}

for (const task of dmlTasks) {
    makeTestForTask(task, 'dml')
}