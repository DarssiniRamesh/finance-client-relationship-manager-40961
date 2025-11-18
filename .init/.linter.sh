#!/bin/bash
cd /home/kavia/workspace/code-generation/finance-client-relationship-manager-40961/crm_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

