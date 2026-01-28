import { UserRepository } from './user.repository';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UserModel } from './user.model';
import BirthdayService from '../../worker/birthday.service';

export class UserService {
    static async create(data: CreateUserDTO) {
        const user = await UserRepository.create(data);

        await BirthdayService.scheduleBirthdayJob(user);

        return user;
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

    static async update(id: string, data: UpdateUserDTO) {
        const user = await UserRepository.update(id, data);

        if (data.birthday || data.timezone) {
            await BirthdayService.rescheduleBirthdayJob(user);
        }

        return user;
    }

    static delete(id: string) {
        return UserRepository.delete(id);
    }
}