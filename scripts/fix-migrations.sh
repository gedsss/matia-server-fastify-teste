#!/bin/bash

# Lista de arquivos de migração
MIGRATIONS=(
  "migrations/20251105185446-create-profile.ts"
  "migrations/20251105185657-create-user-activity-log.ts"
  "migrations/20251105185723-create-messages.ts"
  "migrations/20251105185940-create-documents.ts"
  "migrations/20251105190005-create-documents-tags.ts"
  "migrations/20251105190113-create-documents-tags-relation.ts"
  "migrations/20251105190207-create-documents-analysis.ts"
  "migrations/20251105190252-create-conversation.ts"
  "migrations/20251105190333-create-conversation-documents.ts"
  "migrations/20251105190419-create-activity-log.ts"
)

for migration in "${MIGRATIONS[@]}"; do
  # Lê o arquivo atual
  content=$(cat "$migration")
  
  # Remove a primeira linha em branco se existir
  content=$(echo "$content" | sed '/^$/d')
  
  # Remove as exportações individuais
  content=$(echo "$content" | sed 's/export async function up/async up/g')
  content=$(echo "$content" | sed 's/export async function down/async down/g')
  
  # Adiciona a exportação default
  echo "import { QueryInterface, DataTypes } from 'sequelize';

export default {
$content
};" > "$migration"
done