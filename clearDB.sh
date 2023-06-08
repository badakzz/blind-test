# use environment variables from env/local.env
# export $(cat ./env/local.env)
# echo "POSTGRES_DATABASE: $POSTGRES_DATABASE"
# echo "POSTGRES_HOST: $POSTGRES_HOST"
cd ./models
# export PGPASSWORD=Blindtest123!
# psql -h $POSTGRES_HOST $POSTGRES_DATABASE $POSTGRES_USER -c 'DROP TABLE IF EXISTS chat_messages CASCADE; DROP TABLE IF EXISTS guessed_songs CASCADE; DROP TABLE IF EXISTS chatrooms CASCADE; DROP TABLE IF EXISTS scoreboard CASCADE; DROP SCHEMA IF EXISTS knex_schema CASCADE;CREATE SCHEMA knex_schema;'
yarn exec knex migrate:rollback --all --knexfile ./knexfile.js
yarn exec knex migrate:latest --knexfile ./knexfile.js

# yarn exec knex seed:run --esm