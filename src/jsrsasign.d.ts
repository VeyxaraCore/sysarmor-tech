declare module 'jsrsasign' {
  export class X509 {
    constructor();
    readCertPEM(pem: string): void;
    getNotBefore(): string;
    getNotAfter(): string;
    getNotBeforeDate(): Date;
    getNotAfterDate(): Date;
    getSignatureAlgorithmName(): string;
    getSubjectString(): string;
    getIssuerString(): string;
    [key: string]: any;
  }
}