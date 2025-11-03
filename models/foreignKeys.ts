import sequelize from "../db.js";

import profile from "./profile.js";
import userRole from "./user_roles.js";
import conversation from "./conversation.js";
import messages from "./messages.js";
import documents from "./documents.js";
import documentsAnalysis from "./documents_analysis.js";
import conversationDocuments from "./conversation_documents.js";
import documentsTag from "./documents_tags.js";
import documentsTagsRelation from "./documents_tags_relation.js";
import activityLogs from "./activity_logs.js";

profile.hasMany(userRole, { foreignKey: 'user_id' });
userRole.belongsTo(profile, { foreignKey: 'user_id' });

profile.hasMany(conversation, { foreignKey: 'user_id' });
conversation.belongsTo(profile, { foreignKey: 'user_id' });

conversation.hasMany(messages, { foreignKey: 'conversation_id', onDelete: 'CASCADE' });
messages.belongsTo(conversation, { foreignKey: 'conversation_id' });

profile.hasMany(documents, { foreignKey: 'user_id' });
documents.belongsTo(profile, { foreignKey: 'user_id' });

documents.hasMany(documentsAnalysis, { foreignKey: 'document_id', onDelete: 'CASCADE'});
documentsAnalysis.belongsTo(documents, { foreignKey: 'document_id'});

conversation.hasMany(documentsAnalysis, { foreignKey: 'conversation_id'});
documentsAnalysis.belongsTo(conversation, { foreignKey: 'conversation_id'});

conversation.hasMany(conversationDocuments, { foreignKey: 'conversation_id', onDelete: 'CASCADE' });
conversationDocuments.belongsTo(conversation, { foreignKey: 'conversation_id' });

documents.hasMany(conversationDocuments, { foreignKey: 'document_id', onDelete: 'CASCADE' });
conversationDocuments.belongsTo(documents, { foreignKey: 'document_id' });

documents.hasMany(documentsTagsRelation, { foreignKey: 'document_id', onDelete: 'CASCADE' });
documentsTagsRelation.belongsTo(documents, { foreignKey: 'document_id' });

documentsTag.hasMany(documentsTagsRelation, { foreignKey: 'tag_id', onDelete: 'CASCADE' });
documentsTagsRelation.belongsTo(documentsTag, { foreignKey: 'tag_id' });

profile.hasMany(activityLogs, { foreignKey: 'user_id' });
activityLogs.belongsTo(profile, { foreignKey: 'user_id' });