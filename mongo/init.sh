#!/bin/bash
set -e

mongo <<EOF
use fampay

db.createUser({
  user:  '$FAMPAY_ADMIN_USER',
  pwd: '$FAMPAY_ADMIN_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$FAMPAY_DB'
  }]
})

db.createUser({
  user:  '$FAMPAY_READ_ONLY_USER',
  pwd: '$FAMPAY_READ_ONLY_USER_PASSWORD',
  roles: [{
    role: 'read',
    db: '$FAMPAY_DB'
  }]
})

EOF
