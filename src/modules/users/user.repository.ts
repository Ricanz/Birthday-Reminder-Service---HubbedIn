import { UserModel } from './user.model';

export class UserRepository {
    static create(data: any) {
        return UserModel.create(data);
    }

    static findById(id: string) {
        return UserModel.findById(id);
    }

    static findAll() {
        return UserModel.find();
    }

    static update(id: string, data: any) {
        return UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    static delete(id: string) {
        return UserModel.findByIdAndDelete(id);
    }
}