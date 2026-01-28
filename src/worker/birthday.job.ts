import { UserModel } from '../modules/users/user.model';
import { agenda } from './agenda';
import BirthdayService from './birthday.service';

agenda.define('send birthday message', async (job: any) => {
    const { userId } = job.attrs.data;
    const user = await UserModel.findById(userId);

    if (!user) return;

    console.log(`Happy Birthday ${user.name}! - ${user.email}`);

    await BirthdayService.scheduleBirthdayJob(user);
});