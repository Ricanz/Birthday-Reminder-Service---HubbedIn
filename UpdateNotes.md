# Birthday Reminder Service – Update Notes

## Overview
This service sends birthday reminders exactly at 09:00 AM based on the user’s local timezone.
It uses Agenda with MongoDB and separates API and worker processes.

---

### 1. Avoiding Cron-like Full DB Pulls
Previous approach resembled a cron job that recalculated all users repeatedly.

**Current approach:**
- One Agenda job is scheduled per user
- Job is created on user creation/update
- Agenda executes only at the scheduled time

Result:
- No full database scan
- No periodic polling
- More efficient and scalable

---

### 2. Fixing Next-Year Birthday Issue
Previously, a persistent `birthdayNotifiedAt` flag caused birthdays to stop working the following year.

**Current approach:**
- No deduplication flag stored in DB
- After a birthday job runs, it automatically schedules the next year’s job

This ensures birthdays work correctly every year without manual cleanup.

---

## Architecture
- API: handles HTTP requests and user creation
- Worker: runs Agenda and executes birthday jobs
- MongoDB: stores users and scheduled jobs

API and worker run as separate processes.

---

## Running with Docker

```bash
docker compose up --build
```

This starts:
- birthday-api
- birthday-worker
- birthday-mongo

## Checking Logs
### API Logs
```
docker logs -f birthday-api
```

### Worker logs
```
docker logs -f birthday-worker
```

`expected output`
``` bash
Birthday worker is running
Happy Birthday <User Name>
```
