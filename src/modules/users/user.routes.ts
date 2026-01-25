import { Router } from 'express';
import { UserController } from './user.controller';
import { validateParams } from '../../middlewares/validate-params';
import { idParamSchema } from '../../validators/params/id-param.schema';
import { validateQuery } from '../../middlewares/validate-query';
import { paginationQuerySchema } from '../../validators/query/pagination.schema';

export const userRoutes = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Riyanti Maulya
 *         email:
 *           type: string
 *           example: riyanti.maulya@yopmail.com
 *         birthday:
 *           type: string
 *           format: date-time
 *           example: 1995-08-17T00:00:00.000Z
 *         timezone:
 *           type: string
 *           example: Asia/Jakarta
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         id:
 *           type: string
 *           example: 64e9c2f2a1b4a9c123456789
 *
 *     CreateUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - birthday
 *         - timezone
 *       properties:
 *         name:
 *           type: string
 *           example: Riyanti Maulya
 *         email:
 *           type: string
 *           example: riyanti.maulya@yopmail.com
 *         birthday:
 *           type: string
 *           format: date-time
 *           example: 1995-08-17T00:00:00.000Z
 *         timezone:
 *           type: string
 *           example: Asia/Jakarta
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Riyanti Maulya
 *         email:
 *           type: string
 *           example: riyanti.maulya@yopmail.com
 *         birthday:
 *           type: string
 *           format: date-time
 *           example: 1995-08-17T00:00:00.000Z
 *         timezone:
 *           type: string
 *           example: Asia/Jakarta
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 */
userRoutes.post('/', UserController.create);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRoutes.get('/', validateQuery(paginationQuerySchema), UserController.getAll);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
userRoutes.get('/:id', validateParams(idParamSchema), UserController.getById);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserRequest'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 */
userRoutes.put('/:id', validateParams(idParamSchema), UserController.update);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
userRoutes.delete('/:id', validateParams(idParamSchema), UserController.delete);