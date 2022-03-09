let creds = { email: 'sampletest@sample.com', password: 'Test@12345' };
// set the environment URL with appending '/'
export const url = process.env.URL || 'https://app.stage.lokalise.cloud/';

export function getCredentials () {
  return creds;
}
export function setCredentials (credentials: {
  email: string;
  password: string;
}) {
  creds = credentials;
}
