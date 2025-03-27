# QAPortal_FE

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_ENV=local
```

This variable controls which backend API URL to use:
- When REACT_APP_ENV=local: Uses http://localhost:8000
- When REACT_APP_ENV is not set or different: Uses https://qa-portal-api.example.com
