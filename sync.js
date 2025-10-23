// sync.js (CORREÇÃO FINAL)

// Importa a instância do Sequelize a partir do seu arquivo de conexão (db.js)
import sequelize from './db.js'; 

// ----------------------------------------------------------------------
// 🚨 NOVO ARQUIVO CRUCIAL 🚨
// Importa e EXECUTA o arquivo que define as Chaves Estrangeiras (FKs) e Associações.
// Isso garante que todos os modelos já foram importados E associados.
import './models/foreignKeys.js'; 
// ----------------------------------------------------------------------


async function syncDatabase() {
    
    // --- Teste de Carregamento de Modelos ---
    // (Este teste é importante para confirmar que o foreignKeys.js fez seu trabalho de importação)
    const modelNames = Object.keys(sequelize.models);
    if (modelNames.length === 0) {
        console.error("❌ ERRO: Nenhum modelo foi carregado. Certifique-se de que o 'foreignKeys.js' importa TODOS os arquivos de modelo (profile.js, conversation.js, etc.)");
        return;
    }
    console.log(`✅ ${modelNames.length} modelos carregados e prontos para sincronização.`);

    // ... (O restante do seu código syncDatabase()...)
    
    // 1. Teste de Conexão
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        // ...
        return; 
    }
    
    // 2. Comando de Sincronização
    try {
        // ... (lógica force/alter) ...
        
        await sequelize.sync({ alter: true }); 
        
        console.log("✅ Sincronização do esquema finalizada com sucesso!");
        
    } catch (error) {
        console.error("❌ Erro durante a sincronização (sequelize.sync):", error);
    }
}

syncDatabase();