declare module "sib-api-v3-sdk" {
  export class ApiClient {
    constructor();
    authentications: {
      "api-key": {
        apiKey: string;
      };
    };
  }

  export class TransactionalEmailsApi {
    constructor(client?: ApiClient);
    sendTransacEmail(email: SendSmtpEmail): Promise<any>;
  }

  export class SendSmtpEmail {
    subject?: string;
    htmlContent?: string;
    sender?: {
      name: string;
      email: string;
    };
    to?: Array<{
      email: string;
      name: string;
    }>;
  }
}
