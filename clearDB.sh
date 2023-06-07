# use environment variables from env/local.env
export $(cat ./env/local.env)
echo "POSTGRES_DATABASE: $POSTGRES_DATABASE"
echo "POSTGRES_HOST: $POSTGRES_HOST"
cd ./models
export PGPASSWORD=Blindtest123!
psql -h $POSTGRES_HOST $POSTGRES_DATABASE $POSTGRES_USER -c 'DROP SCHEMA IF EXISTS knex_schema CASCADE;CREATE SCHEMA knex_schema;'
yarn exec knex migrate:latest --esm
# yarn exec knex seed:run --esm