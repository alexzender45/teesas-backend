export interface EnvironmentVariables {
  // DB Envs
  db_host?: string;
  db_port: number;
  db_name: string;
  db_user: string;
  db_password: string;

  // JWT Envs
  jwt_secret: string;
  jwt_expires_in: string;


  // Server Envs
  port?: number;
  node_env?: string;

}
