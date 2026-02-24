import 'reflect-metadata';
import { injectable } from 'inversify';
import { ServerContextBase } from '../ContextBase';

@injectable()
export class ServerContext extends ServerContextBase { }
