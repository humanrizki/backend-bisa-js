import yargs from "yargs"
import {hideBin} from 'yargs/helpers'
import { migrateAll } from "./services/Migrates.js"
yargs(hideBin(process.argv)).command({
    command: 'migrate',
    describe: 'Migrate all migrations',
    handler(argv){
        migrateAll()
    }
}).parse()
// yargs.parse()