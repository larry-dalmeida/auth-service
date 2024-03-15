# Server

## Local Configuration

### Database

```sh
PGPASSWORD="postgres" psql -h localhost -U postgres -p 5432 -w -d auth_users
```

```sh
SET search_path TO app;
\dt+ app.*
```