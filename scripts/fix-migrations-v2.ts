import { readFileSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const migrations = [
  '20251105185446-create-profile.ts',
  '20251105185657-create-user-activity-log.ts',
  '20251105185723-create-messages.ts',
  '20251105185940-create-documents.ts',
  '20251105190005-create-documents-tags.ts',
  '20251105190113-create-documents-tags-relation.ts',
  '20251105190207-create-documents-analysis.ts',
  '20251105190252-create-conversation.ts',
  '20251105190333-create-conversation-documents.ts',
  '20251105190419-create-activity-log.ts',
]

const migrationsPath = resolve(__dirname, '..', 'migrations')

for (const migration of migrations) {
  const filePath = resolve(migrationsPath, migration)
  const content = readFileSync(filePath, 'utf8')

  // Remove exports individuais
  const newContent = content
    .replace(/export async function up/, 'async up')
    .replace(/export async function down/, 'async down')
    .replace(/import.*sequelize['"];?\n/, match => {
      // Adiciona o export default depois do import
      return `${match}\nexport default {\n`
    })
    .replace(/}\n*$/, '};') // Fecha o export default no final do arquivo

  writeFileSync(filePath, newContent, 'utf8')
}
