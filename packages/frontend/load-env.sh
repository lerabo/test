if test "$NODE_ENV" = "staging"
  then    
    mv ./.env.staging ./.env.production
fi
if test "$NODE_ENV" = "prod"
  then
    mv ./.env.prod ./.env.production
fi