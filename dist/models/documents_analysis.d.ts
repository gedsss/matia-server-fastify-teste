import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface DocumentsAnalysisAttributes {
    id: string;
    document_id: string;
    conversation_id: string;
    analysis_type: 'sumario' | 'analise_legal' | 'extracao_entidade' | null;
    result: object | null;
    confidence_score: number | null;
    created_at: Date;
}
export interface DocumentsAnalysisCreationAttributes extends Optional<DocumentsAnalysisAttributes, 'id' | 'created_at' | 'analysis_type' | 'result' | 'confidence_score'> {
}
declare class DocumentsAnalysis extends Model<DocumentsAnalysisAttributes, DocumentsAnalysisCreationAttributes> implements DocumentsAnalysisAttributes {
    id: string;
    conversation_id: string;
    document_id: string;
    analysis_type: 'sumario' | 'analise_legal' | 'extracao_entidade' | null;
    result: object | null;
    confidence_score: number | null;
    created_at: Date;
}
export default DocumentsAnalysis;
