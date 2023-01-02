#!/bin/bash
# js
time curl -H 'Content-Type: application/json' \
      -d '{ "code": "var x = 4;\nconsole.log(x+5);", "langId": 1}' \
      -X POST \
      http://localhost:7000/submissions

# python
time curl -H 'Content-Type: application/json' \
      -d '{ "code": "x = 4\nprint(x+5);", "langId": 2}' \
      -X POST \
      http://localhost:7000/submissions