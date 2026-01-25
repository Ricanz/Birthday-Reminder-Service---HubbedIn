import { UserRepository } from './user.repository';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UserModel } from './user.model';

export class UserService {
    static create(data: CreateUserDTO) {
        return UserRepository.create(data);
    }


    static getById(id: string) {
        return UserRepository.findById(id);
    }

    static async getAll(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            UserModel.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            UserModel.countDocuments(),
        ]);

        return {
            data,
            pagination: {
                page: parseInt(page as any) || 1,
                limit: parseInt(limit as any) || 10,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    static update(id: string, data: UpdateUserDTO) {
        return UserRepository.update(id, data);
    }

    static delete(id: string) {
        return UserRepository.delete(id);
    }
}