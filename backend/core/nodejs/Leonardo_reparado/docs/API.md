# API Documentation for Leonardo Incompleto

## Overview

The API for the "Leonardo está incompleto" project provides endpoints that allow users to interact with the system and retrieve various metrics related to the SENAsoft program. This documentation outlines the available routes, the required parameters, and the expected responses.

## Base URL

The base URL for the API is:

```
https://leonardo-reparado.onrender.com
```

## Endpoints

### 1. Get Metrics by Question

- **Endpoint:** `/leonardo`
- **Method:** `GET`
- **Description:** This endpoint retrieves metrics based on a specific question number (1-6).

#### Parameters

| Name     | In     | Required | Type   | Description                          |
|----------|--------|----------|--------|--------------------------------------|
| pregunta | query  | true     | string | The question number to query (1-6). |

#### Responses

- **200 OK**
  - **Description:** Successfully retrieved the requested metrics.
  - **Content:** 
    - Type: `application/json`
    - Example:
      ```json
      [
        {
          "description": "Metric description",
          "value": "Metric value"
        }
      ]
      ```

- **400 Bad Request**
  - **Description:** The provided question number is invalid.
  - **Content:** 
    - Type: `application/json`
    - Example:
      ```json
      {
        "error": "Pregunta no válida"
      }
      ```

### 2. Get Scalar Metrics

- **Endpoint:** `/metrics/scalar`
- **Method:** `GET`
- **Description:** This endpoint retrieves scalar metrics from the SENAsoft system.

#### Responses

- **200 OK**
  - **Description:** Successfully retrieved the list of scalar metrics.
  - **Content:** 
    - Type: `application/json`
    - Example:
      ```json
      [
        {
          "description": "Metric description",
          "value": 123.45
        }
      ]
      ```

## Conclusion

This API allows users to access important metrics related to the SENAsoft program, facilitating data retrieval for analysis and reporting. For further details on usage and examples, please refer to the other documentation files in this project.