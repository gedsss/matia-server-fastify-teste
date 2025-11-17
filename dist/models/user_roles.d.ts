import type { Optional } from 'sequelize';
import { Model } from 'sequelize';
export interface UserRoleAttributes {
    id: string;
    user_id: string;
    role: 'admin' | 'publico';
    created_at: Date;
}
export interface UserRoleCreationAttributes extends Optional<UserRoleAttributes, 'id' | 'created_at'> {
}
declare class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> implements UserRoleAttributes {
    id: string;
    user_id: string;
    role: 'admin' | 'publico';
    created_at: Date;
}
export default UserRole;
