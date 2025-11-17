import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface DocumentsAttributes {
    id: string;
    user_id: string;
    original_name: string;
    storage_path: string;
    file_type: string;
    file_size: number;
    status: 'enviando' | 'processando' | 'completo' | 'erro' | null;
    progress: number | null;
    uploaded_at: Date;
    processed_at: Date | null;
}
export interface DocumentsCreationAttributes extends Optional<DocumentsAttributes, 'status' | 'progress' | 'id' | 'processed_at' | 'uploaded_at'> {
}
declare class Documents extends Model<DocumentsAttributes, DocumentsCreationAttributes> implements DocumentsAttributes {
    id: string;
    user_id: string;
    original_name: string;
    storage_path: string;
    file_type: string;
    file_size: number;
    status: 'enviando' | 'processando' | 'completo' | 'erro' | null;
    progress: number | null;
    uploaded_at: Date;
    processed_at: Date | null;
}
export default Documents;
