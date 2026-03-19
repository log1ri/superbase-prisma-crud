# superbase

A minimal product CRUD API built with Bun, Elysia, Prisma, and PostgreSQL.

![Bun](https://img.shields.io/badge/Bun-Runtime-111827?style=for-the-badge&logo=bun&logoColor=white)
![Elysia](https://img.shields.io/badge/Elysia-Framework-334155?style=for-the-badge&logo=elysia&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-0C344B?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-2563EB?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-0F766E?style=for-the-badge&logo=typescript&logoColor=white)

![superbase cover](https://capsule-render.vercel.app/api?type=waving&height=220&color=0:0f766e,100:0ea5e9&text=superbase&fontColor=ffffff&fontAlignY=40&desc=Product%20CRUD%20API%20with%20Bun%20%2B%20Elysia%20%2B%20Prisma&descAlignY=62)


## Stack

- Bun
- Elysia
- Prisma ORM
- PostgreSQL
- Prismabox (TypeBox models generated from Prisma)

## Features

- Create product
- Read all products
- Read product by ID
- Update product by ID
- Delete product by ID

## Prerequisites

- Bun 1.2+
- PostgreSQL database

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
DIRECT_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
```

Notes:

- `DATABASE_URL` is used by the runtime adapter in `src/index.ts`.
- `DIRECT_URL` is used by Prisma CLI via `prisma.config.ts`.

## Install

```bash
bun install
```

## Prisma Setup

Generate client/types after schema changes:

```bash
bunx prisma generate
```

Run migrations:

```bash
bunx prisma migrate dev --name init
```

Seed database:

```bash
bunx prisma db seed
```

## Run

Development:

```bash
bun run dev
```

Build:

```bash
bun run build
```

Production:

```bash
bun run start
```

Server default URL:

```text
http://localhost:8000
```

## API Endpoints

### Health

- `GET /`

### Products

- `POST /products`
- `GET /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`

Example payload (create/update):

```json
{
	"name": "Wireless Mouse",
	"detail": "Ergonomic mouse with Bluetooth",
	"price": 29.99
}
```

## Project Structure

```text
src/
	index.ts
prisma/
	schema.prisma
	migrations/
	seed.ts
generated/
	prisma/
	prismabox/
```

## Notes

- `generated/` is ignored by Git and should be regenerated in each environment using `bunx prisma generate`.
- If you deploy to CI/CD, ensure generation happens during install/build.
