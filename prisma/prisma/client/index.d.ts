
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model character
 * 
 */
export type character = $Result.DefaultSelection<Prisma.$characterPayload>
/**
 * Model charStats
 * 
 */
export type charStats = $Result.DefaultSelection<Prisma.$charStatsPayload>
/**
 * Model lineage
 * 
 */
export type lineage = $Result.DefaultSelection<Prisma.$lineagePayload>
/**
 * Model character_lineage
 * 
 */
export type character_lineage = $Result.DefaultSelection<Prisma.$character_lineagePayload>
/**
 * Model skill
 * 
 */
export type skill = $Result.DefaultSelection<Prisma.$skillPayload>
/**
 * Model character_skill
 * 
 */
export type character_skill = $Result.DefaultSelection<Prisma.$character_skillPayload>
/**
 * Model lineage_skill
 * 
 */
export type lineage_skill = $Result.DefaultSelection<Prisma.$lineage_skillPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Characters
 * const characters = await prisma.character.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Characters
   * const characters = await prisma.character.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.character`: Exposes CRUD operations for the **character** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Characters
    * const characters = await prisma.character.findMany()
    * ```
    */
  get character(): Prisma.characterDelegate<ExtArgs>;

  /**
   * `prisma.charStats`: Exposes CRUD operations for the **charStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CharStats
    * const charStats = await prisma.charStats.findMany()
    * ```
    */
  get charStats(): Prisma.charStatsDelegate<ExtArgs>;

  /**
   * `prisma.lineage`: Exposes CRUD operations for the **lineage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lineages
    * const lineages = await prisma.lineage.findMany()
    * ```
    */
  get lineage(): Prisma.lineageDelegate<ExtArgs>;

  /**
   * `prisma.character_lineage`: Exposes CRUD operations for the **character_lineage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Character_lineages
    * const character_lineages = await prisma.character_lineage.findMany()
    * ```
    */
  get character_lineage(): Prisma.character_lineageDelegate<ExtArgs>;

  /**
   * `prisma.skill`: Exposes CRUD operations for the **skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Skills
    * const skills = await prisma.skill.findMany()
    * ```
    */
  get skill(): Prisma.skillDelegate<ExtArgs>;

  /**
   * `prisma.character_skill`: Exposes CRUD operations for the **character_skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Character_skills
    * const character_skills = await prisma.character_skill.findMany()
    * ```
    */
  get character_skill(): Prisma.character_skillDelegate<ExtArgs>;

  /**
   * `prisma.lineage_skill`: Exposes CRUD operations for the **lineage_skill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lineage_skills
    * const lineage_skills = await prisma.lineage_skill.findMany()
    * ```
    */
  get lineage_skill(): Prisma.lineage_skillDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.18.0
   * Query Engine version: 4c784e32044a8a016d99474bd02a3b6123742169
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    character: 'character',
    charStats: 'charStats',
    lineage: 'lineage',
    character_lineage: 'character_lineage',
    skill: 'skill',
    character_skill: 'character_skill',
    lineage_skill: 'lineage_skill',
    user: 'user'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "character" | "charStats" | "lineage" | "character_lineage" | "skill" | "character_skill" | "lineage_skill" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      character: {
        payload: Prisma.$characterPayload<ExtArgs>
        fields: Prisma.characterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.characterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.characterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload>
          }
          findFirst: {
            args: Prisma.characterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.characterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload>
          }
          findMany: {
            args: Prisma.characterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload>[]
          }
          create: {
            args: Prisma.characterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload>
          }
          createMany: {
            args: Prisma.characterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.characterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload>
          }
          update: {
            args: Prisma.characterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload>
          }
          deleteMany: {
            args: Prisma.characterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.characterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.characterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$characterPayload>
          }
          aggregate: {
            args: Prisma.CharacterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharacter>
          }
          groupBy: {
            args: Prisma.characterGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharacterGroupByOutputType>[]
          }
          count: {
            args: Prisma.characterCountArgs<ExtArgs>
            result: $Utils.Optional<CharacterCountAggregateOutputType> | number
          }
        }
      }
      charStats: {
        payload: Prisma.$charStatsPayload<ExtArgs>
        fields: Prisma.charStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.charStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.charStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload>
          }
          findFirst: {
            args: Prisma.charStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.charStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload>
          }
          findMany: {
            args: Prisma.charStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload>[]
          }
          create: {
            args: Prisma.charStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload>
          }
          createMany: {
            args: Prisma.charStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.charStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload>
          }
          update: {
            args: Prisma.charStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload>
          }
          deleteMany: {
            args: Prisma.charStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.charStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.charStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$charStatsPayload>
          }
          aggregate: {
            args: Prisma.CharStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharStats>
          }
          groupBy: {
            args: Prisma.charStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CharStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.charStatsCountArgs<ExtArgs>
            result: $Utils.Optional<CharStatsCountAggregateOutputType> | number
          }
        }
      }
      lineage: {
        payload: Prisma.$lineagePayload<ExtArgs>
        fields: Prisma.lineageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.lineageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.lineageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload>
          }
          findFirst: {
            args: Prisma.lineageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.lineageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload>
          }
          findMany: {
            args: Prisma.lineageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload>[]
          }
          create: {
            args: Prisma.lineageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload>
          }
          createMany: {
            args: Prisma.lineageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.lineageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload>
          }
          update: {
            args: Prisma.lineageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload>
          }
          deleteMany: {
            args: Prisma.lineageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.lineageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.lineageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineagePayload>
          }
          aggregate: {
            args: Prisma.LineageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLineage>
          }
          groupBy: {
            args: Prisma.lineageGroupByArgs<ExtArgs>
            result: $Utils.Optional<LineageGroupByOutputType>[]
          }
          count: {
            args: Prisma.lineageCountArgs<ExtArgs>
            result: $Utils.Optional<LineageCountAggregateOutputType> | number
          }
        }
      }
      character_lineage: {
        payload: Prisma.$character_lineagePayload<ExtArgs>
        fields: Prisma.character_lineageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.character_lineageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.character_lineageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload>
          }
          findFirst: {
            args: Prisma.character_lineageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.character_lineageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload>
          }
          findMany: {
            args: Prisma.character_lineageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload>[]
          }
          create: {
            args: Prisma.character_lineageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload>
          }
          createMany: {
            args: Prisma.character_lineageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.character_lineageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload>
          }
          update: {
            args: Prisma.character_lineageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload>
          }
          deleteMany: {
            args: Prisma.character_lineageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.character_lineageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.character_lineageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_lineagePayload>
          }
          aggregate: {
            args: Prisma.Character_lineageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharacter_lineage>
          }
          groupBy: {
            args: Prisma.character_lineageGroupByArgs<ExtArgs>
            result: $Utils.Optional<Character_lineageGroupByOutputType>[]
          }
          count: {
            args: Prisma.character_lineageCountArgs<ExtArgs>
            result: $Utils.Optional<Character_lineageCountAggregateOutputType> | number
          }
        }
      }
      skill: {
        payload: Prisma.$skillPayload<ExtArgs>
        fields: Prisma.skillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.skillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.skillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload>
          }
          findFirst: {
            args: Prisma.skillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.skillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload>
          }
          findMany: {
            args: Prisma.skillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload>[]
          }
          create: {
            args: Prisma.skillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload>
          }
          createMany: {
            args: Prisma.skillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.skillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload>
          }
          update: {
            args: Prisma.skillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload>
          }
          deleteMany: {
            args: Prisma.skillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.skillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.skillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$skillPayload>
          }
          aggregate: {
            args: Prisma.SkillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSkill>
          }
          groupBy: {
            args: Prisma.skillGroupByArgs<ExtArgs>
            result: $Utils.Optional<SkillGroupByOutputType>[]
          }
          count: {
            args: Prisma.skillCountArgs<ExtArgs>
            result: $Utils.Optional<SkillCountAggregateOutputType> | number
          }
        }
      }
      character_skill: {
        payload: Prisma.$character_skillPayload<ExtArgs>
        fields: Prisma.character_skillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.character_skillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.character_skillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload>
          }
          findFirst: {
            args: Prisma.character_skillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.character_skillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload>
          }
          findMany: {
            args: Prisma.character_skillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload>[]
          }
          create: {
            args: Prisma.character_skillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload>
          }
          createMany: {
            args: Prisma.character_skillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.character_skillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload>
          }
          update: {
            args: Prisma.character_skillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload>
          }
          deleteMany: {
            args: Prisma.character_skillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.character_skillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.character_skillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$character_skillPayload>
          }
          aggregate: {
            args: Prisma.Character_skillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCharacter_skill>
          }
          groupBy: {
            args: Prisma.character_skillGroupByArgs<ExtArgs>
            result: $Utils.Optional<Character_skillGroupByOutputType>[]
          }
          count: {
            args: Prisma.character_skillCountArgs<ExtArgs>
            result: $Utils.Optional<Character_skillCountAggregateOutputType> | number
          }
        }
      }
      lineage_skill: {
        payload: Prisma.$lineage_skillPayload<ExtArgs>
        fields: Prisma.lineage_skillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.lineage_skillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.lineage_skillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload>
          }
          findFirst: {
            args: Prisma.lineage_skillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.lineage_skillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload>
          }
          findMany: {
            args: Prisma.lineage_skillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload>[]
          }
          create: {
            args: Prisma.lineage_skillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload>
          }
          createMany: {
            args: Prisma.lineage_skillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.lineage_skillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload>
          }
          update: {
            args: Prisma.lineage_skillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload>
          }
          deleteMany: {
            args: Prisma.lineage_skillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.lineage_skillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.lineage_skillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lineage_skillPayload>
          }
          aggregate: {
            args: Prisma.Lineage_skillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLineage_skill>
          }
          groupBy: {
            args: Prisma.lineage_skillGroupByArgs<ExtArgs>
            result: $Utils.Optional<Lineage_skillGroupByOutputType>[]
          }
          count: {
            args: Prisma.lineage_skillCountArgs<ExtArgs>
            result: $Utils.Optional<Lineage_skillCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CharacterCountOutputType
   */

  export type CharacterCountOutputType = {
    skills: number
    lineages: number
  }

  export type CharacterCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    skills?: boolean | CharacterCountOutputTypeCountSkillsArgs
    lineages?: boolean | CharacterCountOutputTypeCountLineagesArgs
  }

  // Custom InputTypes
  /**
   * CharacterCountOutputType without action
   */
  export type CharacterCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharacterCountOutputType
     */
    select?: CharacterCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CharacterCountOutputType without action
   */
  export type CharacterCountOutputTypeCountSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: character_skillWhereInput
  }

  /**
   * CharacterCountOutputType without action
   */
  export type CharacterCountOutputTypeCountLineagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: character_lineageWhereInput
  }


  /**
   * Count Type LineageCountOutputType
   */

  export type LineageCountOutputType = {
    characters: number
    skills: number
  }

  export type LineageCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    characters?: boolean | LineageCountOutputTypeCountCharactersArgs
    skills?: boolean | LineageCountOutputTypeCountSkillsArgs
  }

  // Custom InputTypes
  /**
   * LineageCountOutputType without action
   */
  export type LineageCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LineageCountOutputType
     */
    select?: LineageCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LineageCountOutputType without action
   */
  export type LineageCountOutputTypeCountCharactersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: character_lineageWhereInput
  }

  /**
   * LineageCountOutputType without action
   */
  export type LineageCountOutputTypeCountSkillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: lineage_skillWhereInput
  }


  /**
   * Count Type SkillCountOutputType
   */

  export type SkillCountOutputType = {
    characters: number
    lineages: number
  }

  export type SkillCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    characters?: boolean | SkillCountOutputTypeCountCharactersArgs
    lineages?: boolean | SkillCountOutputTypeCountLineagesArgs
  }

  // Custom InputTypes
  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SkillCountOutputType
     */
    select?: SkillCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountCharactersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: character_skillWhereInput
  }

  /**
   * SkillCountOutputType without action
   */
  export type SkillCountOutputTypeCountLineagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: lineage_skillWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    characters: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    characters?: boolean | UserCountOutputTypeCountCharactersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCharactersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: characterWhereInput
  }


  /**
   * Models
   */

  /**
   * Model character
   */

  export type AggregateCharacter = {
    _count: CharacterCountAggregateOutputType | null
    _avg: CharacterAvgAggregateOutputType | null
    _sum: CharacterSumAggregateOutputType | null
    _min: CharacterMinAggregateOutputType | null
    _max: CharacterMaxAggregateOutputType | null
  }

  export type CharacterAvgAggregateOutputType = {
    id: number | null
    level: number | null
    experience: number | null
    tier: number | null
    agility: number | null
    body: number | null
    mind: number | null
    authorId: number | null
  }

  export type CharacterSumAggregateOutputType = {
    id: number | null
    level: number | null
    experience: number | null
    tier: number | null
    agility: number | null
    body: number | null
    mind: number | null
    authorId: number | null
  }

  export type CharacterMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    name: string | null
    level: number | null
    experience: number | null
    tier: number | null
    agility: number | null
    body: number | null
    mind: number | null
    public: boolean | null
    authorId: number | null
  }

  export type CharacterMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    name: string | null
    level: number | null
    experience: number | null
    tier: number | null
    agility: number | null
    body: number | null
    mind: number | null
    public: boolean | null
    authorId: number | null
  }

  export type CharacterCountAggregateOutputType = {
    id: number
    createdAt: number
    name: number
    level: number
    experience: number
    tier: number
    agility: number
    body: number
    mind: number
    public: number
    authorId: number
    _all: number
  }


  export type CharacterAvgAggregateInputType = {
    id?: true
    level?: true
    experience?: true
    tier?: true
    agility?: true
    body?: true
    mind?: true
    authorId?: true
  }

  export type CharacterSumAggregateInputType = {
    id?: true
    level?: true
    experience?: true
    tier?: true
    agility?: true
    body?: true
    mind?: true
    authorId?: true
  }

  export type CharacterMinAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    level?: true
    experience?: true
    tier?: true
    agility?: true
    body?: true
    mind?: true
    public?: true
    authorId?: true
  }

  export type CharacterMaxAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    level?: true
    experience?: true
    tier?: true
    agility?: true
    body?: true
    mind?: true
    public?: true
    authorId?: true
  }

  export type CharacterCountAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    level?: true
    experience?: true
    tier?: true
    agility?: true
    body?: true
    mind?: true
    public?: true
    authorId?: true
    _all?: true
  }

  export type CharacterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which character to aggregate.
     */
    where?: characterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of characters to fetch.
     */
    orderBy?: characterOrderByWithRelationInput | characterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: characterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned characters
    **/
    _count?: true | CharacterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CharacterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CharacterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharacterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharacterMaxAggregateInputType
  }

  export type GetCharacterAggregateType<T extends CharacterAggregateArgs> = {
        [P in keyof T & keyof AggregateCharacter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharacter[P]>
      : GetScalarType<T[P], AggregateCharacter[P]>
  }




  export type characterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: characterWhereInput
    orderBy?: characterOrderByWithAggregationInput | characterOrderByWithAggregationInput[]
    by: CharacterScalarFieldEnum[] | CharacterScalarFieldEnum
    having?: characterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharacterCountAggregateInputType | true
    _avg?: CharacterAvgAggregateInputType
    _sum?: CharacterSumAggregateInputType
    _min?: CharacterMinAggregateInputType
    _max?: CharacterMaxAggregateInputType
  }

  export type CharacterGroupByOutputType = {
    id: number
    createdAt: Date
    name: string
    level: number
    experience: number
    tier: number
    agility: number
    body: number
    mind: number
    public: boolean
    authorId: number
    _count: CharacterCountAggregateOutputType | null
    _avg: CharacterAvgAggregateOutputType | null
    _sum: CharacterSumAggregateOutputType | null
    _min: CharacterMinAggregateOutputType | null
    _max: CharacterMaxAggregateOutputType | null
  }

  type GetCharacterGroupByPayload<T extends characterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharacterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharacterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharacterGroupByOutputType[P]>
            : GetScalarType<T[P], CharacterGroupByOutputType[P]>
        }
      >
    >


  export type characterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    level?: boolean
    experience?: boolean
    tier?: boolean
    agility?: boolean
    body?: boolean
    mind?: boolean
    public?: boolean
    authorId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    skills?: boolean | character$skillsArgs<ExtArgs>
    lineages?: boolean | character$lineagesArgs<ExtArgs>
    stats?: boolean | character$statsArgs<ExtArgs>
    _count?: boolean | CharacterCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character"]>


  export type characterSelectScalar = {
    id?: boolean
    createdAt?: boolean
    name?: boolean
    level?: boolean
    experience?: boolean
    tier?: boolean
    agility?: boolean
    body?: boolean
    mind?: boolean
    public?: boolean
    authorId?: boolean
  }

  export type characterInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    skills?: boolean | character$skillsArgs<ExtArgs>
    lineages?: boolean | character$lineagesArgs<ExtArgs>
    stats?: boolean | character$statsArgs<ExtArgs>
    _count?: boolean | CharacterCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $characterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "character"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      skills: Prisma.$character_skillPayload<ExtArgs>[]
      lineages: Prisma.$character_lineagePayload<ExtArgs>[]
      stats: Prisma.$charStatsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      name: string
      level: number
      experience: number
      tier: number
      agility: number
      body: number
      mind: number
      public: boolean
      authorId: number
    }, ExtArgs["result"]["character"]>
    composites: {}
  }

  type characterGetPayload<S extends boolean | null | undefined | characterDefaultArgs> = $Result.GetResult<Prisma.$characterPayload, S>

  type characterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<characterFindManyArgs, 'select' | 'include' | 'distinct' | 'relationLoadStrategy'> & {
      select?: CharacterCountAggregateInputType | true
    }

  export interface characterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['character'], meta: { name: 'character' } }
    /**
     * Find zero or one Character that matches the filter.
     * @param {characterFindUniqueArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends characterFindUniqueArgs>(args: SelectSubset<T, characterFindUniqueArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Character that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {characterFindUniqueOrThrowArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends characterFindUniqueOrThrowArgs>(args: SelectSubset<T, characterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Character that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {characterFindFirstArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends characterFindFirstArgs>(args?: SelectSubset<T, characterFindFirstArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Character that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {characterFindFirstOrThrowArgs} args - Arguments to find a Character
     * @example
     * // Get one Character
     * const character = await prisma.character.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends characterFindFirstOrThrowArgs>(args?: SelectSubset<T, characterFindFirstOrThrowArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Characters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {characterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Characters
     * const characters = await prisma.character.findMany()
     * 
     * // Get first 10 Characters
     * const characters = await prisma.character.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const characterWithIdOnly = await prisma.character.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends characterFindManyArgs>(args?: SelectSubset<T, characterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Character.
     * @param {characterCreateArgs} args - Arguments to create a Character.
     * @example
     * // Create one Character
     * const Character = await prisma.character.create({
     *   data: {
     *     // ... data to create a Character
     *   }
     * })
     * 
     */
    create<T extends characterCreateArgs>(args: SelectSubset<T, characterCreateArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Characters.
     * @param {characterCreateManyArgs} args - Arguments to create many Characters.
     * @example
     * // Create many Characters
     * const character = await prisma.character.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends characterCreateManyArgs>(args?: SelectSubset<T, characterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Character.
     * @param {characterDeleteArgs} args - Arguments to delete one Character.
     * @example
     * // Delete one Character
     * const Character = await prisma.character.delete({
     *   where: {
     *     // ... filter to delete one Character
     *   }
     * })
     * 
     */
    delete<T extends characterDeleteArgs>(args: SelectSubset<T, characterDeleteArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Character.
     * @param {characterUpdateArgs} args - Arguments to update one Character.
     * @example
     * // Update one Character
     * const character = await prisma.character.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends characterUpdateArgs>(args: SelectSubset<T, characterUpdateArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Characters.
     * @param {characterDeleteManyArgs} args - Arguments to filter Characters to delete.
     * @example
     * // Delete a few Characters
     * const { count } = await prisma.character.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends characterDeleteManyArgs>(args?: SelectSubset<T, characterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Characters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {characterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Characters
     * const character = await prisma.character.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends characterUpdateManyArgs>(args: SelectSubset<T, characterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Character.
     * @param {characterUpsertArgs} args - Arguments to update or create a Character.
     * @example
     * // Update or create a Character
     * const character = await prisma.character.upsert({
     *   create: {
     *     // ... data to create a Character
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Character we want to update
     *   }
     * })
     */
    upsert<T extends characterUpsertArgs>(args: SelectSubset<T, characterUpsertArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Characters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {characterCountArgs} args - Arguments to filter Characters to count.
     * @example
     * // Count the number of Characters
     * const count = await prisma.character.count({
     *   where: {
     *     // ... the filter for the Characters we want to count
     *   }
     * })
    **/
    count<T extends characterCountArgs>(
      args?: Subset<T, characterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharacterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Character.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharacterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CharacterAggregateArgs>(args: Subset<T, CharacterAggregateArgs>): Prisma.PrismaPromise<GetCharacterAggregateType<T>>

    /**
     * Group by Character.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {characterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends characterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: characterGroupByArgs['orderBy'] }
        : { orderBy?: characterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, characterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharacterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the character model
   */
  readonly fields: characterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for character.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__characterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    skills<T extends character$skillsArgs<ExtArgs> = {}>(args?: Subset<T, character$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "findMany"> | Null>
    lineages<T extends character$lineagesArgs<ExtArgs> = {}>(args?: Subset<T, character$lineagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "findMany"> | Null>
    stats<T extends character$statsArgs<ExtArgs> = {}>(args?: Subset<T, character$statsArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the character model
   */ 
  interface characterFieldRefs {
    readonly id: FieldRef<"character", 'Int'>
    readonly createdAt: FieldRef<"character", 'DateTime'>
    readonly name: FieldRef<"character", 'String'>
    readonly level: FieldRef<"character", 'Int'>
    readonly experience: FieldRef<"character", 'Int'>
    readonly tier: FieldRef<"character", 'Int'>
    readonly agility: FieldRef<"character", 'Int'>
    readonly body: FieldRef<"character", 'Int'>
    readonly mind: FieldRef<"character", 'Int'>
    readonly public: FieldRef<"character", 'Boolean'>
    readonly authorId: FieldRef<"character", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * character findUnique
   */
  export type characterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * Filter, which character to fetch.
     */
    where: characterWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character findUniqueOrThrow
   */
  export type characterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * Filter, which character to fetch.
     */
    where: characterWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character findFirst
   */
  export type characterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * Filter, which character to fetch.
     */
    where?: characterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of characters to fetch.
     */
    orderBy?: characterOrderByWithRelationInput | characterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for characters.
     */
    cursor?: characterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of characters.
     */
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character findFirstOrThrow
   */
  export type characterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * Filter, which character to fetch.
     */
    where?: characterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of characters to fetch.
     */
    orderBy?: characterOrderByWithRelationInput | characterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for characters.
     */
    cursor?: characterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` characters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of characters.
     */
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character findMany
   */
  export type characterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * Filter, which characters to fetch.
     */
    where?: characterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of characters to fetch.
     */
    orderBy?: characterOrderByWithRelationInput | characterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing characters.
     */
    cursor?: characterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` characters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` characters.
     */
    skip?: number
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character create
   */
  export type characterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * The data needed to create a character.
     */
    data: XOR<characterCreateInput, characterUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character createMany
   */
  export type characterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many characters.
     */
    data: characterCreateManyInput | characterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * character update
   */
  export type characterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * The data needed to update a character.
     */
    data: XOR<characterUpdateInput, characterUncheckedUpdateInput>
    /**
     * Choose, which character to update.
     */
    where: characterWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character updateMany
   */
  export type characterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update characters.
     */
    data: XOR<characterUpdateManyMutationInput, characterUncheckedUpdateManyInput>
    /**
     * Filter which characters to update
     */
    where?: characterWhereInput
  }

  /**
   * character upsert
   */
  export type characterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * The filter to search for the character to update in case it exists.
     */
    where: characterWhereUniqueInput
    /**
     * In case the character found by the `where` argument doesn't exist, create a new character with this data.
     */
    create: XOR<characterCreateInput, characterUncheckedCreateInput>
    /**
     * In case the character was found with the provided `where` argument, update it with this data.
     */
    update: XOR<characterUpdateInput, characterUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character delete
   */
  export type characterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    /**
     * Filter which character to delete.
     */
    where: characterWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character deleteMany
   */
  export type characterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which characters to delete
     */
    where?: characterWhereInput
  }

  /**
   * character.skills
   */
  export type character$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    where?: character_skillWhereInput
    orderBy?: character_skillOrderByWithRelationInput | character_skillOrderByWithRelationInput[]
    cursor?: character_skillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Character_skillScalarFieldEnum | Character_skillScalarFieldEnum[]
  }

  /**
   * character.lineages
   */
  export type character$lineagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    where?: character_lineageWhereInput
    orderBy?: character_lineageOrderByWithRelationInput | character_lineageOrderByWithRelationInput[]
    cursor?: character_lineageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Character_lineageScalarFieldEnum | Character_lineageScalarFieldEnum[]
  }

  /**
   * character.stats
   */
  export type character$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    where?: charStatsWhereInput
  }

  /**
   * character without action
   */
  export type characterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
  }


  /**
   * Model charStats
   */

  export type AggregateCharStats = {
    _count: CharStatsCountAggregateOutputType | null
    _avg: CharStatsAvgAggregateOutputType | null
    _sum: CharStatsSumAggregateOutputType | null
    _min: CharStatsMinAggregateOutputType | null
    _max: CharStatsMaxAggregateOutputType | null
  }

  export type CharStatsAvgAggregateOutputType = {
    id: number | null
    vitality: number | null
    vigor: number | null
    power: number | null
    speed: number | null
    defense: number | null
    initiative: number | null
    size: number | null
    baseWeight: number | null
    carryCap: number | null
    liftCap: number | null
    characterId: number | null
  }

  export type CharStatsSumAggregateOutputType = {
    id: number | null
    vitality: number | null
    vigor: number | null
    power: number | null
    speed: number | null
    defense: number | null
    initiative: number | null
    size: number | null
    baseWeight: number | null
    carryCap: number | null
    liftCap: number | null
    characterId: number | null
  }

  export type CharStatsMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    vitality: number | null
    vigor: number | null
    power: number | null
    speed: number | null
    defense: number | null
    initiative: number | null
    size: number | null
    baseWeight: number | null
    carryCap: number | null
    liftCap: number | null
    characterId: number | null
  }

  export type CharStatsMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    vitality: number | null
    vigor: number | null
    power: number | null
    speed: number | null
    defense: number | null
    initiative: number | null
    size: number | null
    baseWeight: number | null
    carryCap: number | null
    liftCap: number | null
    characterId: number | null
  }

  export type CharStatsCountAggregateOutputType = {
    id: number
    createdAt: number
    vitality: number
    vigor: number
    power: number
    speed: number
    defense: number
    initiative: number
    size: number
    baseWeight: number
    carryCap: number
    liftCap: number
    characterId: number
    _all: number
  }


  export type CharStatsAvgAggregateInputType = {
    id?: true
    vitality?: true
    vigor?: true
    power?: true
    speed?: true
    defense?: true
    initiative?: true
    size?: true
    baseWeight?: true
    carryCap?: true
    liftCap?: true
    characterId?: true
  }

  export type CharStatsSumAggregateInputType = {
    id?: true
    vitality?: true
    vigor?: true
    power?: true
    speed?: true
    defense?: true
    initiative?: true
    size?: true
    baseWeight?: true
    carryCap?: true
    liftCap?: true
    characterId?: true
  }

  export type CharStatsMinAggregateInputType = {
    id?: true
    createdAt?: true
    vitality?: true
    vigor?: true
    power?: true
    speed?: true
    defense?: true
    initiative?: true
    size?: true
    baseWeight?: true
    carryCap?: true
    liftCap?: true
    characterId?: true
  }

  export type CharStatsMaxAggregateInputType = {
    id?: true
    createdAt?: true
    vitality?: true
    vigor?: true
    power?: true
    speed?: true
    defense?: true
    initiative?: true
    size?: true
    baseWeight?: true
    carryCap?: true
    liftCap?: true
    characterId?: true
  }

  export type CharStatsCountAggregateInputType = {
    id?: true
    createdAt?: true
    vitality?: true
    vigor?: true
    power?: true
    speed?: true
    defense?: true
    initiative?: true
    size?: true
    baseWeight?: true
    carryCap?: true
    liftCap?: true
    characterId?: true
    _all?: true
  }

  export type CharStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which charStats to aggregate.
     */
    where?: charStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of charStats to fetch.
     */
    orderBy?: charStatsOrderByWithRelationInput | charStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: charStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` charStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` charStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned charStats
    **/
    _count?: true | CharStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CharStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CharStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CharStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CharStatsMaxAggregateInputType
  }

  export type GetCharStatsAggregateType<T extends CharStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateCharStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharStats[P]>
      : GetScalarType<T[P], AggregateCharStats[P]>
  }




  export type charStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: charStatsWhereInput
    orderBy?: charStatsOrderByWithAggregationInput | charStatsOrderByWithAggregationInput[]
    by: CharStatsScalarFieldEnum[] | CharStatsScalarFieldEnum
    having?: charStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CharStatsCountAggregateInputType | true
    _avg?: CharStatsAvgAggregateInputType
    _sum?: CharStatsSumAggregateInputType
    _min?: CharStatsMinAggregateInputType
    _max?: CharStatsMaxAggregateInputType
  }

  export type CharStatsGroupByOutputType = {
    id: number
    createdAt: Date
    vitality: number
    vigor: number
    power: number
    speed: number
    defense: number
    initiative: number
    size: number
    baseWeight: number
    carryCap: number
    liftCap: number
    characterId: number
    _count: CharStatsCountAggregateOutputType | null
    _avg: CharStatsAvgAggregateOutputType | null
    _sum: CharStatsSumAggregateOutputType | null
    _min: CharStatsMinAggregateOutputType | null
    _max: CharStatsMaxAggregateOutputType | null
  }

  type GetCharStatsGroupByPayload<T extends charStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CharStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CharStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CharStatsGroupByOutputType[P]>
            : GetScalarType<T[P], CharStatsGroupByOutputType[P]>
        }
      >
    >


  export type charStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    vitality?: boolean
    vigor?: boolean
    power?: boolean
    speed?: boolean
    defense?: boolean
    initiative?: boolean
    size?: boolean
    baseWeight?: boolean
    carryCap?: boolean
    liftCap?: boolean
    characterId?: boolean
    character?: boolean | characterDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["charStats"]>


  export type charStatsSelectScalar = {
    id?: boolean
    createdAt?: boolean
    vitality?: boolean
    vigor?: boolean
    power?: boolean
    speed?: boolean
    defense?: boolean
    initiative?: boolean
    size?: boolean
    baseWeight?: boolean
    carryCap?: boolean
    liftCap?: boolean
    characterId?: boolean
  }

  export type charStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | characterDefaultArgs<ExtArgs>
  }

  export type $charStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "charStats"
    objects: {
      character: Prisma.$characterPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      vitality: number
      vigor: number
      power: number
      speed: number
      defense: number
      initiative: number
      size: number
      baseWeight: number
      carryCap: number
      liftCap: number
      characterId: number
    }, ExtArgs["result"]["charStats"]>
    composites: {}
  }

  type charStatsGetPayload<S extends boolean | null | undefined | charStatsDefaultArgs> = $Result.GetResult<Prisma.$charStatsPayload, S>

  type charStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<charStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'relationLoadStrategy'> & {
      select?: CharStatsCountAggregateInputType | true
    }

  export interface charStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['charStats'], meta: { name: 'charStats' } }
    /**
     * Find zero or one CharStats that matches the filter.
     * @param {charStatsFindUniqueArgs} args - Arguments to find a CharStats
     * @example
     * // Get one CharStats
     * const charStats = await prisma.charStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends charStatsFindUniqueArgs>(args: SelectSubset<T, charStatsFindUniqueArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CharStats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {charStatsFindUniqueOrThrowArgs} args - Arguments to find a CharStats
     * @example
     * // Get one CharStats
     * const charStats = await prisma.charStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends charStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, charStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CharStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {charStatsFindFirstArgs} args - Arguments to find a CharStats
     * @example
     * // Get one CharStats
     * const charStats = await prisma.charStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends charStatsFindFirstArgs>(args?: SelectSubset<T, charStatsFindFirstArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CharStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {charStatsFindFirstOrThrowArgs} args - Arguments to find a CharStats
     * @example
     * // Get one CharStats
     * const charStats = await prisma.charStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends charStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, charStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CharStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {charStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CharStats
     * const charStats = await prisma.charStats.findMany()
     * 
     * // Get first 10 CharStats
     * const charStats = await prisma.charStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const charStatsWithIdOnly = await prisma.charStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends charStatsFindManyArgs>(args?: SelectSubset<T, charStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CharStats.
     * @param {charStatsCreateArgs} args - Arguments to create a CharStats.
     * @example
     * // Create one CharStats
     * const CharStats = await prisma.charStats.create({
     *   data: {
     *     // ... data to create a CharStats
     *   }
     * })
     * 
     */
    create<T extends charStatsCreateArgs>(args: SelectSubset<T, charStatsCreateArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CharStats.
     * @param {charStatsCreateManyArgs} args - Arguments to create many CharStats.
     * @example
     * // Create many CharStats
     * const charStats = await prisma.charStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends charStatsCreateManyArgs>(args?: SelectSubset<T, charStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CharStats.
     * @param {charStatsDeleteArgs} args - Arguments to delete one CharStats.
     * @example
     * // Delete one CharStats
     * const CharStats = await prisma.charStats.delete({
     *   where: {
     *     // ... filter to delete one CharStats
     *   }
     * })
     * 
     */
    delete<T extends charStatsDeleteArgs>(args: SelectSubset<T, charStatsDeleteArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CharStats.
     * @param {charStatsUpdateArgs} args - Arguments to update one CharStats.
     * @example
     * // Update one CharStats
     * const charStats = await prisma.charStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends charStatsUpdateArgs>(args: SelectSubset<T, charStatsUpdateArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CharStats.
     * @param {charStatsDeleteManyArgs} args - Arguments to filter CharStats to delete.
     * @example
     * // Delete a few CharStats
     * const { count } = await prisma.charStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends charStatsDeleteManyArgs>(args?: SelectSubset<T, charStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CharStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {charStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CharStats
     * const charStats = await prisma.charStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends charStatsUpdateManyArgs>(args: SelectSubset<T, charStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CharStats.
     * @param {charStatsUpsertArgs} args - Arguments to update or create a CharStats.
     * @example
     * // Update or create a CharStats
     * const charStats = await prisma.charStats.upsert({
     *   create: {
     *     // ... data to create a CharStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CharStats we want to update
     *   }
     * })
     */
    upsert<T extends charStatsUpsertArgs>(args: SelectSubset<T, charStatsUpsertArgs<ExtArgs>>): Prisma__charStatsClient<$Result.GetResult<Prisma.$charStatsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CharStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {charStatsCountArgs} args - Arguments to filter CharStats to count.
     * @example
     * // Count the number of CharStats
     * const count = await prisma.charStats.count({
     *   where: {
     *     // ... the filter for the CharStats we want to count
     *   }
     * })
    **/
    count<T extends charStatsCountArgs>(
      args?: Subset<T, charStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CharStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CharStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CharStatsAggregateArgs>(args: Subset<T, CharStatsAggregateArgs>): Prisma.PrismaPromise<GetCharStatsAggregateType<T>>

    /**
     * Group by CharStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {charStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends charStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: charStatsGroupByArgs['orderBy'] }
        : { orderBy?: charStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, charStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the charStats model
   */
  readonly fields: charStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for charStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__charStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    character<T extends characterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, characterDefaultArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the charStats model
   */ 
  interface charStatsFieldRefs {
    readonly id: FieldRef<"charStats", 'Int'>
    readonly createdAt: FieldRef<"charStats", 'DateTime'>
    readonly vitality: FieldRef<"charStats", 'Int'>
    readonly vigor: FieldRef<"charStats", 'Int'>
    readonly power: FieldRef<"charStats", 'Int'>
    readonly speed: FieldRef<"charStats", 'Int'>
    readonly defense: FieldRef<"charStats", 'Int'>
    readonly initiative: FieldRef<"charStats", 'Int'>
    readonly size: FieldRef<"charStats", 'Int'>
    readonly baseWeight: FieldRef<"charStats", 'Int'>
    readonly carryCap: FieldRef<"charStats", 'Int'>
    readonly liftCap: FieldRef<"charStats", 'Int'>
    readonly characterId: FieldRef<"charStats", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * charStats findUnique
   */
  export type charStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * Filter, which charStats to fetch.
     */
    where: charStatsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats findUniqueOrThrow
   */
  export type charStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * Filter, which charStats to fetch.
     */
    where: charStatsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats findFirst
   */
  export type charStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * Filter, which charStats to fetch.
     */
    where?: charStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of charStats to fetch.
     */
    orderBy?: charStatsOrderByWithRelationInput | charStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for charStats.
     */
    cursor?: charStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` charStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` charStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of charStats.
     */
    distinct?: CharStatsScalarFieldEnum | CharStatsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats findFirstOrThrow
   */
  export type charStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * Filter, which charStats to fetch.
     */
    where?: charStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of charStats to fetch.
     */
    orderBy?: charStatsOrderByWithRelationInput | charStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for charStats.
     */
    cursor?: charStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` charStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` charStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of charStats.
     */
    distinct?: CharStatsScalarFieldEnum | CharStatsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats findMany
   */
  export type charStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * Filter, which charStats to fetch.
     */
    where?: charStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of charStats to fetch.
     */
    orderBy?: charStatsOrderByWithRelationInput | charStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing charStats.
     */
    cursor?: charStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` charStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` charStats.
     */
    skip?: number
    distinct?: CharStatsScalarFieldEnum | CharStatsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats create
   */
  export type charStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a charStats.
     */
    data: XOR<charStatsCreateInput, charStatsUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats createMany
   */
  export type charStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many charStats.
     */
    data: charStatsCreateManyInput | charStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * charStats update
   */
  export type charStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a charStats.
     */
    data: XOR<charStatsUpdateInput, charStatsUncheckedUpdateInput>
    /**
     * Choose, which charStats to update.
     */
    where: charStatsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats updateMany
   */
  export type charStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update charStats.
     */
    data: XOR<charStatsUpdateManyMutationInput, charStatsUncheckedUpdateManyInput>
    /**
     * Filter which charStats to update
     */
    where?: charStatsWhereInput
  }

  /**
   * charStats upsert
   */
  export type charStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the charStats to update in case it exists.
     */
    where: charStatsWhereUniqueInput
    /**
     * In case the charStats found by the `where` argument doesn't exist, create a new charStats with this data.
     */
    create: XOR<charStatsCreateInput, charStatsUncheckedCreateInput>
    /**
     * In case the charStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<charStatsUpdateInput, charStatsUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats delete
   */
  export type charStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
    /**
     * Filter which charStats to delete.
     */
    where: charStatsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * charStats deleteMany
   */
  export type charStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which charStats to delete
     */
    where?: charStatsWhereInput
  }

  /**
   * charStats without action
   */
  export type charStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the charStats
     */
    select?: charStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: charStatsInclude<ExtArgs> | null
  }


  /**
   * Model lineage
   */

  export type AggregateLineage = {
    _count: LineageCountAggregateOutputType | null
    _avg: LineageAvgAggregateOutputType | null
    _sum: LineageSumAggregateOutputType | null
    _min: LineageMinAggregateOutputType | null
    _max: LineageMaxAggregateOutputType | null
  }

  export type LineageAvgAggregateOutputType = {
    id: number | null
  }

  export type LineageSumAggregateOutputType = {
    id: number | null
  }

  export type LineageMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type LineageMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type LineageCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type LineageAvgAggregateInputType = {
    id?: true
  }

  export type LineageSumAggregateInputType = {
    id?: true
  }

  export type LineageMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type LineageMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type LineageCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type LineageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which lineage to aggregate.
     */
    where?: lineageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lineages to fetch.
     */
    orderBy?: lineageOrderByWithRelationInput | lineageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: lineageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lineages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lineages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned lineages
    **/
    _count?: true | LineageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LineageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LineageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LineageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LineageMaxAggregateInputType
  }

  export type GetLineageAggregateType<T extends LineageAggregateArgs> = {
        [P in keyof T & keyof AggregateLineage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLineage[P]>
      : GetScalarType<T[P], AggregateLineage[P]>
  }




  export type lineageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: lineageWhereInput
    orderBy?: lineageOrderByWithAggregationInput | lineageOrderByWithAggregationInput[]
    by: LineageScalarFieldEnum[] | LineageScalarFieldEnum
    having?: lineageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LineageCountAggregateInputType | true
    _avg?: LineageAvgAggregateInputType
    _sum?: LineageSumAggregateInputType
    _min?: LineageMinAggregateInputType
    _max?: LineageMaxAggregateInputType
  }

  export type LineageGroupByOutputType = {
    id: number
    name: string | null
    description: string
    _count: LineageCountAggregateOutputType | null
    _avg: LineageAvgAggregateOutputType | null
    _sum: LineageSumAggregateOutputType | null
    _min: LineageMinAggregateOutputType | null
    _max: LineageMaxAggregateOutputType | null
  }

  type GetLineageGroupByPayload<T extends lineageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LineageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LineageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LineageGroupByOutputType[P]>
            : GetScalarType<T[P], LineageGroupByOutputType[P]>
        }
      >
    >


  export type lineageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    characters?: boolean | lineage$charactersArgs<ExtArgs>
    skills?: boolean | lineage$skillsArgs<ExtArgs>
    _count?: boolean | LineageCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lineage"]>


  export type lineageSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type lineageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    characters?: boolean | lineage$charactersArgs<ExtArgs>
    skills?: boolean | lineage$skillsArgs<ExtArgs>
    _count?: boolean | LineageCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $lineagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "lineage"
    objects: {
      characters: Prisma.$character_lineagePayload<ExtArgs>[]
      skills: Prisma.$lineage_skillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      description: string
    }, ExtArgs["result"]["lineage"]>
    composites: {}
  }

  type lineageGetPayload<S extends boolean | null | undefined | lineageDefaultArgs> = $Result.GetResult<Prisma.$lineagePayload, S>

  type lineageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<lineageFindManyArgs, 'select' | 'include' | 'distinct' | 'relationLoadStrategy'> & {
      select?: LineageCountAggregateInputType | true
    }

  export interface lineageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['lineage'], meta: { name: 'lineage' } }
    /**
     * Find zero or one Lineage that matches the filter.
     * @param {lineageFindUniqueArgs} args - Arguments to find a Lineage
     * @example
     * // Get one Lineage
     * const lineage = await prisma.lineage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends lineageFindUniqueArgs>(args: SelectSubset<T, lineageFindUniqueArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lineage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {lineageFindUniqueOrThrowArgs} args - Arguments to find a Lineage
     * @example
     * // Get one Lineage
     * const lineage = await prisma.lineage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends lineageFindUniqueOrThrowArgs>(args: SelectSubset<T, lineageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lineage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineageFindFirstArgs} args - Arguments to find a Lineage
     * @example
     * // Get one Lineage
     * const lineage = await prisma.lineage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends lineageFindFirstArgs>(args?: SelectSubset<T, lineageFindFirstArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lineage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineageFindFirstOrThrowArgs} args - Arguments to find a Lineage
     * @example
     * // Get one Lineage
     * const lineage = await prisma.lineage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends lineageFindFirstOrThrowArgs>(args?: SelectSubset<T, lineageFindFirstOrThrowArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Lineages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lineages
     * const lineages = await prisma.lineage.findMany()
     * 
     * // Get first 10 Lineages
     * const lineages = await prisma.lineage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lineageWithIdOnly = await prisma.lineage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends lineageFindManyArgs>(args?: SelectSubset<T, lineageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lineage.
     * @param {lineageCreateArgs} args - Arguments to create a Lineage.
     * @example
     * // Create one Lineage
     * const Lineage = await prisma.lineage.create({
     *   data: {
     *     // ... data to create a Lineage
     *   }
     * })
     * 
     */
    create<T extends lineageCreateArgs>(args: SelectSubset<T, lineageCreateArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Lineages.
     * @param {lineageCreateManyArgs} args - Arguments to create many Lineages.
     * @example
     * // Create many Lineages
     * const lineage = await prisma.lineage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends lineageCreateManyArgs>(args?: SelectSubset<T, lineageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Lineage.
     * @param {lineageDeleteArgs} args - Arguments to delete one Lineage.
     * @example
     * // Delete one Lineage
     * const Lineage = await prisma.lineage.delete({
     *   where: {
     *     // ... filter to delete one Lineage
     *   }
     * })
     * 
     */
    delete<T extends lineageDeleteArgs>(args: SelectSubset<T, lineageDeleteArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lineage.
     * @param {lineageUpdateArgs} args - Arguments to update one Lineage.
     * @example
     * // Update one Lineage
     * const lineage = await prisma.lineage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends lineageUpdateArgs>(args: SelectSubset<T, lineageUpdateArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Lineages.
     * @param {lineageDeleteManyArgs} args - Arguments to filter Lineages to delete.
     * @example
     * // Delete a few Lineages
     * const { count } = await prisma.lineage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends lineageDeleteManyArgs>(args?: SelectSubset<T, lineageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lineages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lineages
     * const lineage = await prisma.lineage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends lineageUpdateManyArgs>(args: SelectSubset<T, lineageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lineage.
     * @param {lineageUpsertArgs} args - Arguments to update or create a Lineage.
     * @example
     * // Update or create a Lineage
     * const lineage = await prisma.lineage.upsert({
     *   create: {
     *     // ... data to create a Lineage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lineage we want to update
     *   }
     * })
     */
    upsert<T extends lineageUpsertArgs>(args: SelectSubset<T, lineageUpsertArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Lineages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineageCountArgs} args - Arguments to filter Lineages to count.
     * @example
     * // Count the number of Lineages
     * const count = await prisma.lineage.count({
     *   where: {
     *     // ... the filter for the Lineages we want to count
     *   }
     * })
    **/
    count<T extends lineageCountArgs>(
      args?: Subset<T, lineageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LineageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lineage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LineageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LineageAggregateArgs>(args: Subset<T, LineageAggregateArgs>): Prisma.PrismaPromise<GetLineageAggregateType<T>>

    /**
     * Group by Lineage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends lineageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: lineageGroupByArgs['orderBy'] }
        : { orderBy?: lineageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, lineageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLineageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the lineage model
   */
  readonly fields: lineageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for lineage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__lineageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    characters<T extends lineage$charactersArgs<ExtArgs> = {}>(args?: Subset<T, lineage$charactersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "findMany"> | Null>
    skills<T extends lineage$skillsArgs<ExtArgs> = {}>(args?: Subset<T, lineage$skillsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the lineage model
   */ 
  interface lineageFieldRefs {
    readonly id: FieldRef<"lineage", 'Int'>
    readonly name: FieldRef<"lineage", 'String'>
    readonly description: FieldRef<"lineage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * lineage findUnique
   */
  export type lineageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * Filter, which lineage to fetch.
     */
    where: lineageWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage findUniqueOrThrow
   */
  export type lineageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * Filter, which lineage to fetch.
     */
    where: lineageWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage findFirst
   */
  export type lineageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * Filter, which lineage to fetch.
     */
    where?: lineageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lineages to fetch.
     */
    orderBy?: lineageOrderByWithRelationInput | lineageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lineages.
     */
    cursor?: lineageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lineages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lineages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lineages.
     */
    distinct?: LineageScalarFieldEnum | LineageScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage findFirstOrThrow
   */
  export type lineageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * Filter, which lineage to fetch.
     */
    where?: lineageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lineages to fetch.
     */
    orderBy?: lineageOrderByWithRelationInput | lineageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lineages.
     */
    cursor?: lineageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lineages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lineages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lineages.
     */
    distinct?: LineageScalarFieldEnum | LineageScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage findMany
   */
  export type lineageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * Filter, which lineages to fetch.
     */
    where?: lineageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lineages to fetch.
     */
    orderBy?: lineageOrderByWithRelationInput | lineageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing lineages.
     */
    cursor?: lineageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lineages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lineages.
     */
    skip?: number
    distinct?: LineageScalarFieldEnum | LineageScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage create
   */
  export type lineageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * The data needed to create a lineage.
     */
    data: XOR<lineageCreateInput, lineageUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage createMany
   */
  export type lineageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many lineages.
     */
    data: lineageCreateManyInput | lineageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * lineage update
   */
  export type lineageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * The data needed to update a lineage.
     */
    data: XOR<lineageUpdateInput, lineageUncheckedUpdateInput>
    /**
     * Choose, which lineage to update.
     */
    where: lineageWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage updateMany
   */
  export type lineageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update lineages.
     */
    data: XOR<lineageUpdateManyMutationInput, lineageUncheckedUpdateManyInput>
    /**
     * Filter which lineages to update
     */
    where?: lineageWhereInput
  }

  /**
   * lineage upsert
   */
  export type lineageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * The filter to search for the lineage to update in case it exists.
     */
    where: lineageWhereUniqueInput
    /**
     * In case the lineage found by the `where` argument doesn't exist, create a new lineage with this data.
     */
    create: XOR<lineageCreateInput, lineageUncheckedCreateInput>
    /**
     * In case the lineage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<lineageUpdateInput, lineageUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage delete
   */
  export type lineageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
    /**
     * Filter which lineage to delete.
     */
    where: lineageWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage deleteMany
   */
  export type lineageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which lineages to delete
     */
    where?: lineageWhereInput
  }

  /**
   * lineage.characters
   */
  export type lineage$charactersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    where?: character_lineageWhereInput
    orderBy?: character_lineageOrderByWithRelationInput | character_lineageOrderByWithRelationInput[]
    cursor?: character_lineageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Character_lineageScalarFieldEnum | Character_lineageScalarFieldEnum[]
  }

  /**
   * lineage.skills
   */
  export type lineage$skillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    where?: lineage_skillWhereInput
    orderBy?: lineage_skillOrderByWithRelationInput | lineage_skillOrderByWithRelationInput[]
    cursor?: lineage_skillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Lineage_skillScalarFieldEnum | Lineage_skillScalarFieldEnum[]
  }

  /**
   * lineage without action
   */
  export type lineageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage
     */
    select?: lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineageInclude<ExtArgs> | null
  }


  /**
   * Model character_lineage
   */

  export type AggregateCharacter_lineage = {
    _count: Character_lineageCountAggregateOutputType | null
    _avg: Character_lineageAvgAggregateOutputType | null
    _sum: Character_lineageSumAggregateOutputType | null
    _min: Character_lineageMinAggregateOutputType | null
    _max: Character_lineageMaxAggregateOutputType | null
  }

  export type Character_lineageAvgAggregateOutputType = {
    id: number | null
    characterId: number | null
    lineageId: number | null
  }

  export type Character_lineageSumAggregateOutputType = {
    id: number | null
    characterId: number | null
    lineageId: number | null
  }

  export type Character_lineageMinAggregateOutputType = {
    id: number | null
    characterId: number | null
    lineageId: number | null
    pure: boolean | null
  }

  export type Character_lineageMaxAggregateOutputType = {
    id: number | null
    characterId: number | null
    lineageId: number | null
    pure: boolean | null
  }

  export type Character_lineageCountAggregateOutputType = {
    id: number
    characterId: number
    lineageId: number
    pure: number
    _all: number
  }


  export type Character_lineageAvgAggregateInputType = {
    id?: true
    characterId?: true
    lineageId?: true
  }

  export type Character_lineageSumAggregateInputType = {
    id?: true
    characterId?: true
    lineageId?: true
  }

  export type Character_lineageMinAggregateInputType = {
    id?: true
    characterId?: true
    lineageId?: true
    pure?: true
  }

  export type Character_lineageMaxAggregateInputType = {
    id?: true
    characterId?: true
    lineageId?: true
    pure?: true
  }

  export type Character_lineageCountAggregateInputType = {
    id?: true
    characterId?: true
    lineageId?: true
    pure?: true
    _all?: true
  }

  export type Character_lineageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which character_lineage to aggregate.
     */
    where?: character_lineageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of character_lineages to fetch.
     */
    orderBy?: character_lineageOrderByWithRelationInput | character_lineageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: character_lineageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` character_lineages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` character_lineages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned character_lineages
    **/
    _count?: true | Character_lineageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Character_lineageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Character_lineageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Character_lineageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Character_lineageMaxAggregateInputType
  }

  export type GetCharacter_lineageAggregateType<T extends Character_lineageAggregateArgs> = {
        [P in keyof T & keyof AggregateCharacter_lineage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharacter_lineage[P]>
      : GetScalarType<T[P], AggregateCharacter_lineage[P]>
  }




  export type character_lineageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: character_lineageWhereInput
    orderBy?: character_lineageOrderByWithAggregationInput | character_lineageOrderByWithAggregationInput[]
    by: Character_lineageScalarFieldEnum[] | Character_lineageScalarFieldEnum
    having?: character_lineageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Character_lineageCountAggregateInputType | true
    _avg?: Character_lineageAvgAggregateInputType
    _sum?: Character_lineageSumAggregateInputType
    _min?: Character_lineageMinAggregateInputType
    _max?: Character_lineageMaxAggregateInputType
  }

  export type Character_lineageGroupByOutputType = {
    id: number
    characterId: number
    lineageId: number
    pure: boolean
    _count: Character_lineageCountAggregateOutputType | null
    _avg: Character_lineageAvgAggregateOutputType | null
    _sum: Character_lineageSumAggregateOutputType | null
    _min: Character_lineageMinAggregateOutputType | null
    _max: Character_lineageMaxAggregateOutputType | null
  }

  type GetCharacter_lineageGroupByPayload<T extends character_lineageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Character_lineageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Character_lineageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Character_lineageGroupByOutputType[P]>
            : GetScalarType<T[P], Character_lineageGroupByOutputType[P]>
        }
      >
    >


  export type character_lineageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    characterId?: boolean
    lineageId?: boolean
    pure?: boolean
    character?: boolean | characterDefaultArgs<ExtArgs>
    lineage?: boolean | lineageDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character_lineage"]>


  export type character_lineageSelectScalar = {
    id?: boolean
    characterId?: boolean
    lineageId?: boolean
    pure?: boolean
  }

  export type character_lineageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | characterDefaultArgs<ExtArgs>
    lineage?: boolean | lineageDefaultArgs<ExtArgs>
  }

  export type $character_lineagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "character_lineage"
    objects: {
      character: Prisma.$characterPayload<ExtArgs>
      lineage: Prisma.$lineagePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      characterId: number
      lineageId: number
      pure: boolean
    }, ExtArgs["result"]["character_lineage"]>
    composites: {}
  }

  type character_lineageGetPayload<S extends boolean | null | undefined | character_lineageDefaultArgs> = $Result.GetResult<Prisma.$character_lineagePayload, S>

  type character_lineageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<character_lineageFindManyArgs, 'select' | 'include' | 'distinct' | 'relationLoadStrategy'> & {
      select?: Character_lineageCountAggregateInputType | true
    }

  export interface character_lineageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['character_lineage'], meta: { name: 'character_lineage' } }
    /**
     * Find zero or one Character_lineage that matches the filter.
     * @param {character_lineageFindUniqueArgs} args - Arguments to find a Character_lineage
     * @example
     * // Get one Character_lineage
     * const character_lineage = await prisma.character_lineage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends character_lineageFindUniqueArgs>(args: SelectSubset<T, character_lineageFindUniqueArgs<ExtArgs>>): Prisma__character_lineageClient<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Character_lineage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {character_lineageFindUniqueOrThrowArgs} args - Arguments to find a Character_lineage
     * @example
     * // Get one Character_lineage
     * const character_lineage = await prisma.character_lineage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends character_lineageFindUniqueOrThrowArgs>(args: SelectSubset<T, character_lineageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__character_lineageClient<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Character_lineage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_lineageFindFirstArgs} args - Arguments to find a Character_lineage
     * @example
     * // Get one Character_lineage
     * const character_lineage = await prisma.character_lineage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends character_lineageFindFirstArgs>(args?: SelectSubset<T, character_lineageFindFirstArgs<ExtArgs>>): Prisma__character_lineageClient<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Character_lineage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_lineageFindFirstOrThrowArgs} args - Arguments to find a Character_lineage
     * @example
     * // Get one Character_lineage
     * const character_lineage = await prisma.character_lineage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends character_lineageFindFirstOrThrowArgs>(args?: SelectSubset<T, character_lineageFindFirstOrThrowArgs<ExtArgs>>): Prisma__character_lineageClient<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Character_lineages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_lineageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Character_lineages
     * const character_lineages = await prisma.character_lineage.findMany()
     * 
     * // Get first 10 Character_lineages
     * const character_lineages = await prisma.character_lineage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const character_lineageWithIdOnly = await prisma.character_lineage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends character_lineageFindManyArgs>(args?: SelectSubset<T, character_lineageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Character_lineage.
     * @param {character_lineageCreateArgs} args - Arguments to create a Character_lineage.
     * @example
     * // Create one Character_lineage
     * const Character_lineage = await prisma.character_lineage.create({
     *   data: {
     *     // ... data to create a Character_lineage
     *   }
     * })
     * 
     */
    create<T extends character_lineageCreateArgs>(args: SelectSubset<T, character_lineageCreateArgs<ExtArgs>>): Prisma__character_lineageClient<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Character_lineages.
     * @param {character_lineageCreateManyArgs} args - Arguments to create many Character_lineages.
     * @example
     * // Create many Character_lineages
     * const character_lineage = await prisma.character_lineage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends character_lineageCreateManyArgs>(args?: SelectSubset<T, character_lineageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Character_lineage.
     * @param {character_lineageDeleteArgs} args - Arguments to delete one Character_lineage.
     * @example
     * // Delete one Character_lineage
     * const Character_lineage = await prisma.character_lineage.delete({
     *   where: {
     *     // ... filter to delete one Character_lineage
     *   }
     * })
     * 
     */
    delete<T extends character_lineageDeleteArgs>(args: SelectSubset<T, character_lineageDeleteArgs<ExtArgs>>): Prisma__character_lineageClient<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Character_lineage.
     * @param {character_lineageUpdateArgs} args - Arguments to update one Character_lineage.
     * @example
     * // Update one Character_lineage
     * const character_lineage = await prisma.character_lineage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends character_lineageUpdateArgs>(args: SelectSubset<T, character_lineageUpdateArgs<ExtArgs>>): Prisma__character_lineageClient<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Character_lineages.
     * @param {character_lineageDeleteManyArgs} args - Arguments to filter Character_lineages to delete.
     * @example
     * // Delete a few Character_lineages
     * const { count } = await prisma.character_lineage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends character_lineageDeleteManyArgs>(args?: SelectSubset<T, character_lineageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Character_lineages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_lineageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Character_lineages
     * const character_lineage = await prisma.character_lineage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends character_lineageUpdateManyArgs>(args: SelectSubset<T, character_lineageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Character_lineage.
     * @param {character_lineageUpsertArgs} args - Arguments to update or create a Character_lineage.
     * @example
     * // Update or create a Character_lineage
     * const character_lineage = await prisma.character_lineage.upsert({
     *   create: {
     *     // ... data to create a Character_lineage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Character_lineage we want to update
     *   }
     * })
     */
    upsert<T extends character_lineageUpsertArgs>(args: SelectSubset<T, character_lineageUpsertArgs<ExtArgs>>): Prisma__character_lineageClient<$Result.GetResult<Prisma.$character_lineagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Character_lineages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_lineageCountArgs} args - Arguments to filter Character_lineages to count.
     * @example
     * // Count the number of Character_lineages
     * const count = await prisma.character_lineage.count({
     *   where: {
     *     // ... the filter for the Character_lineages we want to count
     *   }
     * })
    **/
    count<T extends character_lineageCountArgs>(
      args?: Subset<T, character_lineageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Character_lineageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Character_lineage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Character_lineageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Character_lineageAggregateArgs>(args: Subset<T, Character_lineageAggregateArgs>): Prisma.PrismaPromise<GetCharacter_lineageAggregateType<T>>

    /**
     * Group by Character_lineage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_lineageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends character_lineageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: character_lineageGroupByArgs['orderBy'] }
        : { orderBy?: character_lineageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, character_lineageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharacter_lineageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the character_lineage model
   */
  readonly fields: character_lineageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for character_lineage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__character_lineageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    character<T extends characterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, characterDefaultArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    lineage<T extends lineageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, lineageDefaultArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the character_lineage model
   */ 
  interface character_lineageFieldRefs {
    readonly id: FieldRef<"character_lineage", 'Int'>
    readonly characterId: FieldRef<"character_lineage", 'Int'>
    readonly lineageId: FieldRef<"character_lineage", 'Int'>
    readonly pure: FieldRef<"character_lineage", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * character_lineage findUnique
   */
  export type character_lineageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * Filter, which character_lineage to fetch.
     */
    where: character_lineageWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage findUniqueOrThrow
   */
  export type character_lineageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * Filter, which character_lineage to fetch.
     */
    where: character_lineageWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage findFirst
   */
  export type character_lineageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * Filter, which character_lineage to fetch.
     */
    where?: character_lineageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of character_lineages to fetch.
     */
    orderBy?: character_lineageOrderByWithRelationInput | character_lineageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for character_lineages.
     */
    cursor?: character_lineageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` character_lineages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` character_lineages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of character_lineages.
     */
    distinct?: Character_lineageScalarFieldEnum | Character_lineageScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage findFirstOrThrow
   */
  export type character_lineageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * Filter, which character_lineage to fetch.
     */
    where?: character_lineageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of character_lineages to fetch.
     */
    orderBy?: character_lineageOrderByWithRelationInput | character_lineageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for character_lineages.
     */
    cursor?: character_lineageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` character_lineages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` character_lineages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of character_lineages.
     */
    distinct?: Character_lineageScalarFieldEnum | Character_lineageScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage findMany
   */
  export type character_lineageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * Filter, which character_lineages to fetch.
     */
    where?: character_lineageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of character_lineages to fetch.
     */
    orderBy?: character_lineageOrderByWithRelationInput | character_lineageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing character_lineages.
     */
    cursor?: character_lineageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` character_lineages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` character_lineages.
     */
    skip?: number
    distinct?: Character_lineageScalarFieldEnum | Character_lineageScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage create
   */
  export type character_lineageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * The data needed to create a character_lineage.
     */
    data: XOR<character_lineageCreateInput, character_lineageUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage createMany
   */
  export type character_lineageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many character_lineages.
     */
    data: character_lineageCreateManyInput | character_lineageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * character_lineage update
   */
  export type character_lineageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * The data needed to update a character_lineage.
     */
    data: XOR<character_lineageUpdateInput, character_lineageUncheckedUpdateInput>
    /**
     * Choose, which character_lineage to update.
     */
    where: character_lineageWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage updateMany
   */
  export type character_lineageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update character_lineages.
     */
    data: XOR<character_lineageUpdateManyMutationInput, character_lineageUncheckedUpdateManyInput>
    /**
     * Filter which character_lineages to update
     */
    where?: character_lineageWhereInput
  }

  /**
   * character_lineage upsert
   */
  export type character_lineageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * The filter to search for the character_lineage to update in case it exists.
     */
    where: character_lineageWhereUniqueInput
    /**
     * In case the character_lineage found by the `where` argument doesn't exist, create a new character_lineage with this data.
     */
    create: XOR<character_lineageCreateInput, character_lineageUncheckedCreateInput>
    /**
     * In case the character_lineage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<character_lineageUpdateInput, character_lineageUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage delete
   */
  export type character_lineageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
    /**
     * Filter which character_lineage to delete.
     */
    where: character_lineageWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_lineage deleteMany
   */
  export type character_lineageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which character_lineages to delete
     */
    where?: character_lineageWhereInput
  }

  /**
   * character_lineage without action
   */
  export type character_lineageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_lineage
     */
    select?: character_lineageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_lineageInclude<ExtArgs> | null
  }


  /**
   * Model skill
   */

  export type AggregateSkill = {
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  export type SkillAvgAggregateOutputType = {
    id: number | null
  }

  export type SkillSumAggregateOutputType = {
    id: number | null
  }

  export type SkillMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type SkillMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
  }

  export type SkillCountAggregateOutputType = {
    id: number
    name: number
    description: number
    _all: number
  }


  export type SkillAvgAggregateInputType = {
    id?: true
  }

  export type SkillSumAggregateInputType = {
    id?: true
  }

  export type SkillMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type SkillMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
  }

  export type SkillCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    _all?: true
  }

  export type SkillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which skill to aggregate.
     */
    where?: skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of skills to fetch.
     */
    orderBy?: skillOrderByWithRelationInput | skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned skills
    **/
    _count?: true | SkillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SkillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SkillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SkillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SkillMaxAggregateInputType
  }

  export type GetSkillAggregateType<T extends SkillAggregateArgs> = {
        [P in keyof T & keyof AggregateSkill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSkill[P]>
      : GetScalarType<T[P], AggregateSkill[P]>
  }




  export type skillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: skillWhereInput
    orderBy?: skillOrderByWithAggregationInput | skillOrderByWithAggregationInput[]
    by: SkillScalarFieldEnum[] | SkillScalarFieldEnum
    having?: skillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SkillCountAggregateInputType | true
    _avg?: SkillAvgAggregateInputType
    _sum?: SkillSumAggregateInputType
    _min?: SkillMinAggregateInputType
    _max?: SkillMaxAggregateInputType
  }

  export type SkillGroupByOutputType = {
    id: number
    name: string | null
    description: string | null
    _count: SkillCountAggregateOutputType | null
    _avg: SkillAvgAggregateOutputType | null
    _sum: SkillSumAggregateOutputType | null
    _min: SkillMinAggregateOutputType | null
    _max: SkillMaxAggregateOutputType | null
  }

  type GetSkillGroupByPayload<T extends skillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SkillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SkillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SkillGroupByOutputType[P]>
            : GetScalarType<T[P], SkillGroupByOutputType[P]>
        }
      >
    >


  export type skillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    characters?: boolean | skill$charactersArgs<ExtArgs>
    lineages?: boolean | skill$lineagesArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["skill"]>


  export type skillSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
  }

  export type skillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    characters?: boolean | skill$charactersArgs<ExtArgs>
    lineages?: boolean | skill$lineagesArgs<ExtArgs>
    _count?: boolean | SkillCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $skillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "skill"
    objects: {
      characters: Prisma.$character_skillPayload<ExtArgs>[]
      lineages: Prisma.$lineage_skillPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      description: string | null
    }, ExtArgs["result"]["skill"]>
    composites: {}
  }

  type skillGetPayload<S extends boolean | null | undefined | skillDefaultArgs> = $Result.GetResult<Prisma.$skillPayload, S>

  type skillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<skillFindManyArgs, 'select' | 'include' | 'distinct' | 'relationLoadStrategy'> & {
      select?: SkillCountAggregateInputType | true
    }

  export interface skillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['skill'], meta: { name: 'skill' } }
    /**
     * Find zero or one Skill that matches the filter.
     * @param {skillFindUniqueArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends skillFindUniqueArgs>(args: SelectSubset<T, skillFindUniqueArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Skill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {skillFindUniqueOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends skillFindUniqueOrThrowArgs>(args: SelectSubset<T, skillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillFindFirstArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends skillFindFirstArgs>(args?: SelectSubset<T, skillFindFirstArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillFindFirstOrThrowArgs} args - Arguments to find a Skill
     * @example
     * // Get one Skill
     * const skill = await prisma.skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends skillFindFirstOrThrowArgs>(args?: SelectSubset<T, skillFindFirstOrThrowArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Skills
     * const skills = await prisma.skill.findMany()
     * 
     * // Get first 10 Skills
     * const skills = await prisma.skill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const skillWithIdOnly = await prisma.skill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends skillFindManyArgs>(args?: SelectSubset<T, skillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Skill.
     * @param {skillCreateArgs} args - Arguments to create a Skill.
     * @example
     * // Create one Skill
     * const Skill = await prisma.skill.create({
     *   data: {
     *     // ... data to create a Skill
     *   }
     * })
     * 
     */
    create<T extends skillCreateArgs>(args: SelectSubset<T, skillCreateArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Skills.
     * @param {skillCreateManyArgs} args - Arguments to create many Skills.
     * @example
     * // Create many Skills
     * const skill = await prisma.skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends skillCreateManyArgs>(args?: SelectSubset<T, skillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Skill.
     * @param {skillDeleteArgs} args - Arguments to delete one Skill.
     * @example
     * // Delete one Skill
     * const Skill = await prisma.skill.delete({
     *   where: {
     *     // ... filter to delete one Skill
     *   }
     * })
     * 
     */
    delete<T extends skillDeleteArgs>(args: SelectSubset<T, skillDeleteArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Skill.
     * @param {skillUpdateArgs} args - Arguments to update one Skill.
     * @example
     * // Update one Skill
     * const skill = await prisma.skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends skillUpdateArgs>(args: SelectSubset<T, skillUpdateArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Skills.
     * @param {skillDeleteManyArgs} args - Arguments to filter Skills to delete.
     * @example
     * // Delete a few Skills
     * const { count } = await prisma.skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends skillDeleteManyArgs>(args?: SelectSubset<T, skillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Skills
     * const skill = await prisma.skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends skillUpdateManyArgs>(args: SelectSubset<T, skillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Skill.
     * @param {skillUpsertArgs} args - Arguments to update or create a Skill.
     * @example
     * // Update or create a Skill
     * const skill = await prisma.skill.upsert({
     *   create: {
     *     // ... data to create a Skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Skill we want to update
     *   }
     * })
     */
    upsert<T extends skillUpsertArgs>(args: SelectSubset<T, skillUpsertArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillCountArgs} args - Arguments to filter Skills to count.
     * @example
     * // Count the number of Skills
     * const count = await prisma.skill.count({
     *   where: {
     *     // ... the filter for the Skills we want to count
     *   }
     * })
    **/
    count<T extends skillCountArgs>(
      args?: Subset<T, skillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SkillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SkillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SkillAggregateArgs>(args: Subset<T, SkillAggregateArgs>): Prisma.PrismaPromise<GetSkillAggregateType<T>>

    /**
     * Group by Skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {skillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends skillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: skillGroupByArgs['orderBy'] }
        : { orderBy?: skillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, skillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSkillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the skill model
   */
  readonly fields: skillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__skillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    characters<T extends skill$charactersArgs<ExtArgs> = {}>(args?: Subset<T, skill$charactersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "findMany"> | Null>
    lineages<T extends skill$lineagesArgs<ExtArgs> = {}>(args?: Subset<T, skill$lineagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the skill model
   */ 
  interface skillFieldRefs {
    readonly id: FieldRef<"skill", 'Int'>
    readonly name: FieldRef<"skill", 'String'>
    readonly description: FieldRef<"skill", 'String'>
  }
    

  // Custom InputTypes
  /**
   * skill findUnique
   */
  export type skillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * Filter, which skill to fetch.
     */
    where: skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill findUniqueOrThrow
   */
  export type skillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * Filter, which skill to fetch.
     */
    where: skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill findFirst
   */
  export type skillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * Filter, which skill to fetch.
     */
    where?: skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of skills to fetch.
     */
    orderBy?: skillOrderByWithRelationInput | skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for skills.
     */
    cursor?: skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill findFirstOrThrow
   */
  export type skillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * Filter, which skill to fetch.
     */
    where?: skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of skills to fetch.
     */
    orderBy?: skillOrderByWithRelationInput | skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for skills.
     */
    cursor?: skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of skills.
     */
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill findMany
   */
  export type skillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * Filter, which skills to fetch.
     */
    where?: skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of skills to fetch.
     */
    orderBy?: skillOrderByWithRelationInput | skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing skills.
     */
    cursor?: skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` skills.
     */
    skip?: number
    distinct?: SkillScalarFieldEnum | SkillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill create
   */
  export type skillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * The data needed to create a skill.
     */
    data?: XOR<skillCreateInput, skillUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill createMany
   */
  export type skillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many skills.
     */
    data: skillCreateManyInput | skillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * skill update
   */
  export type skillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * The data needed to update a skill.
     */
    data: XOR<skillUpdateInput, skillUncheckedUpdateInput>
    /**
     * Choose, which skill to update.
     */
    where: skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill updateMany
   */
  export type skillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update skills.
     */
    data: XOR<skillUpdateManyMutationInput, skillUncheckedUpdateManyInput>
    /**
     * Filter which skills to update
     */
    where?: skillWhereInput
  }

  /**
   * skill upsert
   */
  export type skillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * The filter to search for the skill to update in case it exists.
     */
    where: skillWhereUniqueInput
    /**
     * In case the skill found by the `where` argument doesn't exist, create a new skill with this data.
     */
    create: XOR<skillCreateInput, skillUncheckedCreateInput>
    /**
     * In case the skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<skillUpdateInput, skillUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill delete
   */
  export type skillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
    /**
     * Filter which skill to delete.
     */
    where: skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * skill deleteMany
   */
  export type skillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which skills to delete
     */
    where?: skillWhereInput
  }

  /**
   * skill.characters
   */
  export type skill$charactersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    where?: character_skillWhereInput
    orderBy?: character_skillOrderByWithRelationInput | character_skillOrderByWithRelationInput[]
    cursor?: character_skillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Character_skillScalarFieldEnum | Character_skillScalarFieldEnum[]
  }

  /**
   * skill.lineages
   */
  export type skill$lineagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    where?: lineage_skillWhereInput
    orderBy?: lineage_skillOrderByWithRelationInput | lineage_skillOrderByWithRelationInput[]
    cursor?: lineage_skillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Lineage_skillScalarFieldEnum | Lineage_skillScalarFieldEnum[]
  }

  /**
   * skill without action
   */
  export type skillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the skill
     */
    select?: skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: skillInclude<ExtArgs> | null
  }


  /**
   * Model character_skill
   */

  export type AggregateCharacter_skill = {
    _count: Character_skillCountAggregateOutputType | null
    _avg: Character_skillAvgAggregateOutputType | null
    _sum: Character_skillSumAggregateOutputType | null
    _min: Character_skillMinAggregateOutputType | null
    _max: Character_skillMaxAggregateOutputType | null
  }

  export type Character_skillAvgAggregateOutputType = {
    id: number | null
    characterId: number | null
    skillId: number | null
  }

  export type Character_skillSumAggregateOutputType = {
    id: number | null
    characterId: number | null
    skillId: number | null
  }

  export type Character_skillMinAggregateOutputType = {
    id: number | null
    characterId: number | null
    skillId: number | null
  }

  export type Character_skillMaxAggregateOutputType = {
    id: number | null
    characterId: number | null
    skillId: number | null
  }

  export type Character_skillCountAggregateOutputType = {
    id: number
    characterId: number
    skillId: number
    _all: number
  }


  export type Character_skillAvgAggregateInputType = {
    id?: true
    characterId?: true
    skillId?: true
  }

  export type Character_skillSumAggregateInputType = {
    id?: true
    characterId?: true
    skillId?: true
  }

  export type Character_skillMinAggregateInputType = {
    id?: true
    characterId?: true
    skillId?: true
  }

  export type Character_skillMaxAggregateInputType = {
    id?: true
    characterId?: true
    skillId?: true
  }

  export type Character_skillCountAggregateInputType = {
    id?: true
    characterId?: true
    skillId?: true
    _all?: true
  }

  export type Character_skillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which character_skill to aggregate.
     */
    where?: character_skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of character_skills to fetch.
     */
    orderBy?: character_skillOrderByWithRelationInput | character_skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: character_skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` character_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` character_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned character_skills
    **/
    _count?: true | Character_skillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Character_skillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Character_skillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Character_skillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Character_skillMaxAggregateInputType
  }

  export type GetCharacter_skillAggregateType<T extends Character_skillAggregateArgs> = {
        [P in keyof T & keyof AggregateCharacter_skill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCharacter_skill[P]>
      : GetScalarType<T[P], AggregateCharacter_skill[P]>
  }




  export type character_skillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: character_skillWhereInput
    orderBy?: character_skillOrderByWithAggregationInput | character_skillOrderByWithAggregationInput[]
    by: Character_skillScalarFieldEnum[] | Character_skillScalarFieldEnum
    having?: character_skillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Character_skillCountAggregateInputType | true
    _avg?: Character_skillAvgAggregateInputType
    _sum?: Character_skillSumAggregateInputType
    _min?: Character_skillMinAggregateInputType
    _max?: Character_skillMaxAggregateInputType
  }

  export type Character_skillGroupByOutputType = {
    id: number
    characterId: number
    skillId: number
    _count: Character_skillCountAggregateOutputType | null
    _avg: Character_skillAvgAggregateOutputType | null
    _sum: Character_skillSumAggregateOutputType | null
    _min: Character_skillMinAggregateOutputType | null
    _max: Character_skillMaxAggregateOutputType | null
  }

  type GetCharacter_skillGroupByPayload<T extends character_skillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Character_skillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Character_skillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Character_skillGroupByOutputType[P]>
            : GetScalarType<T[P], Character_skillGroupByOutputType[P]>
        }
      >
    >


  export type character_skillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    characterId?: boolean
    skillId?: boolean
    character?: boolean | characterDefaultArgs<ExtArgs>
    skill?: boolean | skillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["character_skill"]>


  export type character_skillSelectScalar = {
    id?: boolean
    characterId?: boolean
    skillId?: boolean
  }

  export type character_skillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    character?: boolean | characterDefaultArgs<ExtArgs>
    skill?: boolean | skillDefaultArgs<ExtArgs>
  }

  export type $character_skillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "character_skill"
    objects: {
      character: Prisma.$characterPayload<ExtArgs>
      skill: Prisma.$skillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      characterId: number
      skillId: number
    }, ExtArgs["result"]["character_skill"]>
    composites: {}
  }

  type character_skillGetPayload<S extends boolean | null | undefined | character_skillDefaultArgs> = $Result.GetResult<Prisma.$character_skillPayload, S>

  type character_skillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<character_skillFindManyArgs, 'select' | 'include' | 'distinct' | 'relationLoadStrategy'> & {
      select?: Character_skillCountAggregateInputType | true
    }

  export interface character_skillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['character_skill'], meta: { name: 'character_skill' } }
    /**
     * Find zero or one Character_skill that matches the filter.
     * @param {character_skillFindUniqueArgs} args - Arguments to find a Character_skill
     * @example
     * // Get one Character_skill
     * const character_skill = await prisma.character_skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends character_skillFindUniqueArgs>(args: SelectSubset<T, character_skillFindUniqueArgs<ExtArgs>>): Prisma__character_skillClient<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Character_skill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {character_skillFindUniqueOrThrowArgs} args - Arguments to find a Character_skill
     * @example
     * // Get one Character_skill
     * const character_skill = await prisma.character_skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends character_skillFindUniqueOrThrowArgs>(args: SelectSubset<T, character_skillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__character_skillClient<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Character_skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_skillFindFirstArgs} args - Arguments to find a Character_skill
     * @example
     * // Get one Character_skill
     * const character_skill = await prisma.character_skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends character_skillFindFirstArgs>(args?: SelectSubset<T, character_skillFindFirstArgs<ExtArgs>>): Prisma__character_skillClient<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Character_skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_skillFindFirstOrThrowArgs} args - Arguments to find a Character_skill
     * @example
     * // Get one Character_skill
     * const character_skill = await prisma.character_skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends character_skillFindFirstOrThrowArgs>(args?: SelectSubset<T, character_skillFindFirstOrThrowArgs<ExtArgs>>): Prisma__character_skillClient<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Character_skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_skillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Character_skills
     * const character_skills = await prisma.character_skill.findMany()
     * 
     * // Get first 10 Character_skills
     * const character_skills = await prisma.character_skill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const character_skillWithIdOnly = await prisma.character_skill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends character_skillFindManyArgs>(args?: SelectSubset<T, character_skillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Character_skill.
     * @param {character_skillCreateArgs} args - Arguments to create a Character_skill.
     * @example
     * // Create one Character_skill
     * const Character_skill = await prisma.character_skill.create({
     *   data: {
     *     // ... data to create a Character_skill
     *   }
     * })
     * 
     */
    create<T extends character_skillCreateArgs>(args: SelectSubset<T, character_skillCreateArgs<ExtArgs>>): Prisma__character_skillClient<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Character_skills.
     * @param {character_skillCreateManyArgs} args - Arguments to create many Character_skills.
     * @example
     * // Create many Character_skills
     * const character_skill = await prisma.character_skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends character_skillCreateManyArgs>(args?: SelectSubset<T, character_skillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Character_skill.
     * @param {character_skillDeleteArgs} args - Arguments to delete one Character_skill.
     * @example
     * // Delete one Character_skill
     * const Character_skill = await prisma.character_skill.delete({
     *   where: {
     *     // ... filter to delete one Character_skill
     *   }
     * })
     * 
     */
    delete<T extends character_skillDeleteArgs>(args: SelectSubset<T, character_skillDeleteArgs<ExtArgs>>): Prisma__character_skillClient<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Character_skill.
     * @param {character_skillUpdateArgs} args - Arguments to update one Character_skill.
     * @example
     * // Update one Character_skill
     * const character_skill = await prisma.character_skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends character_skillUpdateArgs>(args: SelectSubset<T, character_skillUpdateArgs<ExtArgs>>): Prisma__character_skillClient<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Character_skills.
     * @param {character_skillDeleteManyArgs} args - Arguments to filter Character_skills to delete.
     * @example
     * // Delete a few Character_skills
     * const { count } = await prisma.character_skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends character_skillDeleteManyArgs>(args?: SelectSubset<T, character_skillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Character_skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_skillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Character_skills
     * const character_skill = await prisma.character_skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends character_skillUpdateManyArgs>(args: SelectSubset<T, character_skillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Character_skill.
     * @param {character_skillUpsertArgs} args - Arguments to update or create a Character_skill.
     * @example
     * // Update or create a Character_skill
     * const character_skill = await prisma.character_skill.upsert({
     *   create: {
     *     // ... data to create a Character_skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Character_skill we want to update
     *   }
     * })
     */
    upsert<T extends character_skillUpsertArgs>(args: SelectSubset<T, character_skillUpsertArgs<ExtArgs>>): Prisma__character_skillClient<$Result.GetResult<Prisma.$character_skillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Character_skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_skillCountArgs} args - Arguments to filter Character_skills to count.
     * @example
     * // Count the number of Character_skills
     * const count = await prisma.character_skill.count({
     *   where: {
     *     // ... the filter for the Character_skills we want to count
     *   }
     * })
    **/
    count<T extends character_skillCountArgs>(
      args?: Subset<T, character_skillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Character_skillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Character_skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Character_skillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Character_skillAggregateArgs>(args: Subset<T, Character_skillAggregateArgs>): Prisma.PrismaPromise<GetCharacter_skillAggregateType<T>>

    /**
     * Group by Character_skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {character_skillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends character_skillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: character_skillGroupByArgs['orderBy'] }
        : { orderBy?: character_skillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, character_skillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharacter_skillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the character_skill model
   */
  readonly fields: character_skillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for character_skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__character_skillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    character<T extends characterDefaultArgs<ExtArgs> = {}>(args?: Subset<T, characterDefaultArgs<ExtArgs>>): Prisma__characterClient<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    skill<T extends skillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, skillDefaultArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the character_skill model
   */ 
  interface character_skillFieldRefs {
    readonly id: FieldRef<"character_skill", 'Int'>
    readonly characterId: FieldRef<"character_skill", 'Int'>
    readonly skillId: FieldRef<"character_skill", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * character_skill findUnique
   */
  export type character_skillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * Filter, which character_skill to fetch.
     */
    where: character_skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill findUniqueOrThrow
   */
  export type character_skillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * Filter, which character_skill to fetch.
     */
    where: character_skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill findFirst
   */
  export type character_skillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * Filter, which character_skill to fetch.
     */
    where?: character_skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of character_skills to fetch.
     */
    orderBy?: character_skillOrderByWithRelationInput | character_skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for character_skills.
     */
    cursor?: character_skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` character_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` character_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of character_skills.
     */
    distinct?: Character_skillScalarFieldEnum | Character_skillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill findFirstOrThrow
   */
  export type character_skillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * Filter, which character_skill to fetch.
     */
    where?: character_skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of character_skills to fetch.
     */
    orderBy?: character_skillOrderByWithRelationInput | character_skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for character_skills.
     */
    cursor?: character_skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` character_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` character_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of character_skills.
     */
    distinct?: Character_skillScalarFieldEnum | Character_skillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill findMany
   */
  export type character_skillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * Filter, which character_skills to fetch.
     */
    where?: character_skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of character_skills to fetch.
     */
    orderBy?: character_skillOrderByWithRelationInput | character_skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing character_skills.
     */
    cursor?: character_skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` character_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` character_skills.
     */
    skip?: number
    distinct?: Character_skillScalarFieldEnum | Character_skillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill create
   */
  export type character_skillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * The data needed to create a character_skill.
     */
    data: XOR<character_skillCreateInput, character_skillUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill createMany
   */
  export type character_skillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many character_skills.
     */
    data: character_skillCreateManyInput | character_skillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * character_skill update
   */
  export type character_skillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * The data needed to update a character_skill.
     */
    data: XOR<character_skillUpdateInput, character_skillUncheckedUpdateInput>
    /**
     * Choose, which character_skill to update.
     */
    where: character_skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill updateMany
   */
  export type character_skillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update character_skills.
     */
    data: XOR<character_skillUpdateManyMutationInput, character_skillUncheckedUpdateManyInput>
    /**
     * Filter which character_skills to update
     */
    where?: character_skillWhereInput
  }

  /**
   * character_skill upsert
   */
  export type character_skillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * The filter to search for the character_skill to update in case it exists.
     */
    where: character_skillWhereUniqueInput
    /**
     * In case the character_skill found by the `where` argument doesn't exist, create a new character_skill with this data.
     */
    create: XOR<character_skillCreateInput, character_skillUncheckedCreateInput>
    /**
     * In case the character_skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<character_skillUpdateInput, character_skillUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill delete
   */
  export type character_skillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
    /**
     * Filter which character_skill to delete.
     */
    where: character_skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * character_skill deleteMany
   */
  export type character_skillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which character_skills to delete
     */
    where?: character_skillWhereInput
  }

  /**
   * character_skill without action
   */
  export type character_skillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character_skill
     */
    select?: character_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: character_skillInclude<ExtArgs> | null
  }


  /**
   * Model lineage_skill
   */

  export type AggregateLineage_skill = {
    _count: Lineage_skillCountAggregateOutputType | null
    _avg: Lineage_skillAvgAggregateOutputType | null
    _sum: Lineage_skillSumAggregateOutputType | null
    _min: Lineage_skillMinAggregateOutputType | null
    _max: Lineage_skillMaxAggregateOutputType | null
  }

  export type Lineage_skillAvgAggregateOutputType = {
    id: number | null
    lineageId: number | null
    skillId: number | null
  }

  export type Lineage_skillSumAggregateOutputType = {
    id: number | null
    lineageId: number | null
    skillId: number | null
  }

  export type Lineage_skillMinAggregateOutputType = {
    id: number | null
    lineageId: number | null
    skillId: number | null
    pureSkill: boolean | null
  }

  export type Lineage_skillMaxAggregateOutputType = {
    id: number | null
    lineageId: number | null
    skillId: number | null
    pureSkill: boolean | null
  }

  export type Lineage_skillCountAggregateOutputType = {
    id: number
    lineageId: number
    skillId: number
    pureSkill: number
    _all: number
  }


  export type Lineage_skillAvgAggregateInputType = {
    id?: true
    lineageId?: true
    skillId?: true
  }

  export type Lineage_skillSumAggregateInputType = {
    id?: true
    lineageId?: true
    skillId?: true
  }

  export type Lineage_skillMinAggregateInputType = {
    id?: true
    lineageId?: true
    skillId?: true
    pureSkill?: true
  }

  export type Lineage_skillMaxAggregateInputType = {
    id?: true
    lineageId?: true
    skillId?: true
    pureSkill?: true
  }

  export type Lineage_skillCountAggregateInputType = {
    id?: true
    lineageId?: true
    skillId?: true
    pureSkill?: true
    _all?: true
  }

  export type Lineage_skillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which lineage_skill to aggregate.
     */
    where?: lineage_skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lineage_skills to fetch.
     */
    orderBy?: lineage_skillOrderByWithRelationInput | lineage_skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: lineage_skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lineage_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lineage_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned lineage_skills
    **/
    _count?: true | Lineage_skillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Lineage_skillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Lineage_skillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Lineage_skillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Lineage_skillMaxAggregateInputType
  }

  export type GetLineage_skillAggregateType<T extends Lineage_skillAggregateArgs> = {
        [P in keyof T & keyof AggregateLineage_skill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLineage_skill[P]>
      : GetScalarType<T[P], AggregateLineage_skill[P]>
  }




  export type lineage_skillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: lineage_skillWhereInput
    orderBy?: lineage_skillOrderByWithAggregationInput | lineage_skillOrderByWithAggregationInput[]
    by: Lineage_skillScalarFieldEnum[] | Lineage_skillScalarFieldEnum
    having?: lineage_skillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Lineage_skillCountAggregateInputType | true
    _avg?: Lineage_skillAvgAggregateInputType
    _sum?: Lineage_skillSumAggregateInputType
    _min?: Lineage_skillMinAggregateInputType
    _max?: Lineage_skillMaxAggregateInputType
  }

  export type Lineage_skillGroupByOutputType = {
    id: number
    lineageId: number
    skillId: number
    pureSkill: boolean
    _count: Lineage_skillCountAggregateOutputType | null
    _avg: Lineage_skillAvgAggregateOutputType | null
    _sum: Lineage_skillSumAggregateOutputType | null
    _min: Lineage_skillMinAggregateOutputType | null
    _max: Lineage_skillMaxAggregateOutputType | null
  }

  type GetLineage_skillGroupByPayload<T extends lineage_skillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Lineage_skillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Lineage_skillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Lineage_skillGroupByOutputType[P]>
            : GetScalarType<T[P], Lineage_skillGroupByOutputType[P]>
        }
      >
    >


  export type lineage_skillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    lineageId?: boolean
    skillId?: boolean
    pureSkill?: boolean
    lineage?: boolean | lineageDefaultArgs<ExtArgs>
    skill?: boolean | skillDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lineage_skill"]>


  export type lineage_skillSelectScalar = {
    id?: boolean
    lineageId?: boolean
    skillId?: boolean
    pureSkill?: boolean
  }

  export type lineage_skillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lineage?: boolean | lineageDefaultArgs<ExtArgs>
    skill?: boolean | skillDefaultArgs<ExtArgs>
  }

  export type $lineage_skillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "lineage_skill"
    objects: {
      lineage: Prisma.$lineagePayload<ExtArgs>
      skill: Prisma.$skillPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      lineageId: number
      skillId: number
      pureSkill: boolean
    }, ExtArgs["result"]["lineage_skill"]>
    composites: {}
  }

  type lineage_skillGetPayload<S extends boolean | null | undefined | lineage_skillDefaultArgs> = $Result.GetResult<Prisma.$lineage_skillPayload, S>

  type lineage_skillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<lineage_skillFindManyArgs, 'select' | 'include' | 'distinct' | 'relationLoadStrategy'> & {
      select?: Lineage_skillCountAggregateInputType | true
    }

  export interface lineage_skillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['lineage_skill'], meta: { name: 'lineage_skill' } }
    /**
     * Find zero or one Lineage_skill that matches the filter.
     * @param {lineage_skillFindUniqueArgs} args - Arguments to find a Lineage_skill
     * @example
     * // Get one Lineage_skill
     * const lineage_skill = await prisma.lineage_skill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends lineage_skillFindUniqueArgs>(args: SelectSubset<T, lineage_skillFindUniqueArgs<ExtArgs>>): Prisma__lineage_skillClient<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Lineage_skill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {lineage_skillFindUniqueOrThrowArgs} args - Arguments to find a Lineage_skill
     * @example
     * // Get one Lineage_skill
     * const lineage_skill = await prisma.lineage_skill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends lineage_skillFindUniqueOrThrowArgs>(args: SelectSubset<T, lineage_skillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__lineage_skillClient<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Lineage_skill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineage_skillFindFirstArgs} args - Arguments to find a Lineage_skill
     * @example
     * // Get one Lineage_skill
     * const lineage_skill = await prisma.lineage_skill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends lineage_skillFindFirstArgs>(args?: SelectSubset<T, lineage_skillFindFirstArgs<ExtArgs>>): Prisma__lineage_skillClient<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Lineage_skill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineage_skillFindFirstOrThrowArgs} args - Arguments to find a Lineage_skill
     * @example
     * // Get one Lineage_skill
     * const lineage_skill = await prisma.lineage_skill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends lineage_skillFindFirstOrThrowArgs>(args?: SelectSubset<T, lineage_skillFindFirstOrThrowArgs<ExtArgs>>): Prisma__lineage_skillClient<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Lineage_skills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineage_skillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lineage_skills
     * const lineage_skills = await prisma.lineage_skill.findMany()
     * 
     * // Get first 10 Lineage_skills
     * const lineage_skills = await prisma.lineage_skill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lineage_skillWithIdOnly = await prisma.lineage_skill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends lineage_skillFindManyArgs>(args?: SelectSubset<T, lineage_skillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Lineage_skill.
     * @param {lineage_skillCreateArgs} args - Arguments to create a Lineage_skill.
     * @example
     * // Create one Lineage_skill
     * const Lineage_skill = await prisma.lineage_skill.create({
     *   data: {
     *     // ... data to create a Lineage_skill
     *   }
     * })
     * 
     */
    create<T extends lineage_skillCreateArgs>(args: SelectSubset<T, lineage_skillCreateArgs<ExtArgs>>): Prisma__lineage_skillClient<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Lineage_skills.
     * @param {lineage_skillCreateManyArgs} args - Arguments to create many Lineage_skills.
     * @example
     * // Create many Lineage_skills
     * const lineage_skill = await prisma.lineage_skill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends lineage_skillCreateManyArgs>(args?: SelectSubset<T, lineage_skillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Lineage_skill.
     * @param {lineage_skillDeleteArgs} args - Arguments to delete one Lineage_skill.
     * @example
     * // Delete one Lineage_skill
     * const Lineage_skill = await prisma.lineage_skill.delete({
     *   where: {
     *     // ... filter to delete one Lineage_skill
     *   }
     * })
     * 
     */
    delete<T extends lineage_skillDeleteArgs>(args: SelectSubset<T, lineage_skillDeleteArgs<ExtArgs>>): Prisma__lineage_skillClient<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Lineage_skill.
     * @param {lineage_skillUpdateArgs} args - Arguments to update one Lineage_skill.
     * @example
     * // Update one Lineage_skill
     * const lineage_skill = await prisma.lineage_skill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends lineage_skillUpdateArgs>(args: SelectSubset<T, lineage_skillUpdateArgs<ExtArgs>>): Prisma__lineage_skillClient<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Lineage_skills.
     * @param {lineage_skillDeleteManyArgs} args - Arguments to filter Lineage_skills to delete.
     * @example
     * // Delete a few Lineage_skills
     * const { count } = await prisma.lineage_skill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends lineage_skillDeleteManyArgs>(args?: SelectSubset<T, lineage_skillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lineage_skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineage_skillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lineage_skills
     * const lineage_skill = await prisma.lineage_skill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends lineage_skillUpdateManyArgs>(args: SelectSubset<T, lineage_skillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Lineage_skill.
     * @param {lineage_skillUpsertArgs} args - Arguments to update or create a Lineage_skill.
     * @example
     * // Update or create a Lineage_skill
     * const lineage_skill = await prisma.lineage_skill.upsert({
     *   create: {
     *     // ... data to create a Lineage_skill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lineage_skill we want to update
     *   }
     * })
     */
    upsert<T extends lineage_skillUpsertArgs>(args: SelectSubset<T, lineage_skillUpsertArgs<ExtArgs>>): Prisma__lineage_skillClient<$Result.GetResult<Prisma.$lineage_skillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Lineage_skills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineage_skillCountArgs} args - Arguments to filter Lineage_skills to count.
     * @example
     * // Count the number of Lineage_skills
     * const count = await prisma.lineage_skill.count({
     *   where: {
     *     // ... the filter for the Lineage_skills we want to count
     *   }
     * })
    **/
    count<T extends lineage_skillCountArgs>(
      args?: Subset<T, lineage_skillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Lineage_skillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lineage_skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Lineage_skillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Lineage_skillAggregateArgs>(args: Subset<T, Lineage_skillAggregateArgs>): Prisma.PrismaPromise<GetLineage_skillAggregateType<T>>

    /**
     * Group by Lineage_skill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lineage_skillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends lineage_skillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: lineage_skillGroupByArgs['orderBy'] }
        : { orderBy?: lineage_skillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, lineage_skillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLineage_skillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the lineage_skill model
   */
  readonly fields: lineage_skillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for lineage_skill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__lineage_skillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lineage<T extends lineageDefaultArgs<ExtArgs> = {}>(args?: Subset<T, lineageDefaultArgs<ExtArgs>>): Prisma__lineageClient<$Result.GetResult<Prisma.$lineagePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    skill<T extends skillDefaultArgs<ExtArgs> = {}>(args?: Subset<T, skillDefaultArgs<ExtArgs>>): Prisma__skillClient<$Result.GetResult<Prisma.$skillPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the lineage_skill model
   */ 
  interface lineage_skillFieldRefs {
    readonly id: FieldRef<"lineage_skill", 'Int'>
    readonly lineageId: FieldRef<"lineage_skill", 'Int'>
    readonly skillId: FieldRef<"lineage_skill", 'Int'>
    readonly pureSkill: FieldRef<"lineage_skill", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * lineage_skill findUnique
   */
  export type lineage_skillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * Filter, which lineage_skill to fetch.
     */
    where: lineage_skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill findUniqueOrThrow
   */
  export type lineage_skillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * Filter, which lineage_skill to fetch.
     */
    where: lineage_skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill findFirst
   */
  export type lineage_skillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * Filter, which lineage_skill to fetch.
     */
    where?: lineage_skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lineage_skills to fetch.
     */
    orderBy?: lineage_skillOrderByWithRelationInput | lineage_skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lineage_skills.
     */
    cursor?: lineage_skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lineage_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lineage_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lineage_skills.
     */
    distinct?: Lineage_skillScalarFieldEnum | Lineage_skillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill findFirstOrThrow
   */
  export type lineage_skillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * Filter, which lineage_skill to fetch.
     */
    where?: lineage_skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lineage_skills to fetch.
     */
    orderBy?: lineage_skillOrderByWithRelationInput | lineage_skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lineage_skills.
     */
    cursor?: lineage_skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lineage_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lineage_skills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lineage_skills.
     */
    distinct?: Lineage_skillScalarFieldEnum | Lineage_skillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill findMany
   */
  export type lineage_skillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * Filter, which lineage_skills to fetch.
     */
    where?: lineage_skillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lineage_skills to fetch.
     */
    orderBy?: lineage_skillOrderByWithRelationInput | lineage_skillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing lineage_skills.
     */
    cursor?: lineage_skillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lineage_skills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lineage_skills.
     */
    skip?: number
    distinct?: Lineage_skillScalarFieldEnum | Lineage_skillScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill create
   */
  export type lineage_skillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * The data needed to create a lineage_skill.
     */
    data: XOR<lineage_skillCreateInput, lineage_skillUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill createMany
   */
  export type lineage_skillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many lineage_skills.
     */
    data: lineage_skillCreateManyInput | lineage_skillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * lineage_skill update
   */
  export type lineage_skillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * The data needed to update a lineage_skill.
     */
    data: XOR<lineage_skillUpdateInput, lineage_skillUncheckedUpdateInput>
    /**
     * Choose, which lineage_skill to update.
     */
    where: lineage_skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill updateMany
   */
  export type lineage_skillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update lineage_skills.
     */
    data: XOR<lineage_skillUpdateManyMutationInput, lineage_skillUncheckedUpdateManyInput>
    /**
     * Filter which lineage_skills to update
     */
    where?: lineage_skillWhereInput
  }

  /**
   * lineage_skill upsert
   */
  export type lineage_skillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * The filter to search for the lineage_skill to update in case it exists.
     */
    where: lineage_skillWhereUniqueInput
    /**
     * In case the lineage_skill found by the `where` argument doesn't exist, create a new lineage_skill with this data.
     */
    create: XOR<lineage_skillCreateInput, lineage_skillUncheckedCreateInput>
    /**
     * In case the lineage_skill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<lineage_skillUpdateInput, lineage_skillUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill delete
   */
  export type lineage_skillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
    /**
     * Filter which lineage_skill to delete.
     */
    where: lineage_skillWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * lineage_skill deleteMany
   */
  export type lineage_skillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which lineage_skills to delete
     */
    where?: lineage_skillWhereInput
  }

  /**
   * lineage_skill without action
   */
  export type lineage_skillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lineage_skill
     */
    select?: lineage_skillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lineage_skillInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    username: string | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
    updatedAt: Date | null
    email: string | null
    username: string | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    email: number
    username: number
    password: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    username?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    username?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    email?: true
    username?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    createdAt: Date
    updatedAt: Date
    email: string
    username: string
    password: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    characters?: boolean | user$charactersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type userSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
  }

  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    characters?: boolean | user$charactersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      characters: Prisma.$characterPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date
      updatedAt: Date
      email: string
      username: string
      password: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'relationLoadStrategy'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    characters<T extends user$charactersArgs<ExtArgs> = {}>(args?: Subset<T, user$charactersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$characterPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */ 
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'Int'>
    readonly createdAt: FieldRef<"user", 'DateTime'>
    readonly updatedAt: FieldRef<"user", 'DateTime'>
    readonly email: FieldRef<"user", 'String'>
    readonly username: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
  }

  /**
   * user.characters
   */
  export type user$charactersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the character
     */
    select?: characterSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: characterInclude<ExtArgs> | null
    where?: characterWhereInput
    orderBy?: characterOrderByWithRelationInput | characterOrderByWithRelationInput[]
    cursor?: characterWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CharacterScalarFieldEnum | CharacterScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CharacterScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    name: 'name',
    level: 'level',
    experience: 'experience',
    tier: 'tier',
    agility: 'agility',
    body: 'body',
    mind: 'mind',
    public: 'public',
    authorId: 'authorId'
  };

  export type CharacterScalarFieldEnum = (typeof CharacterScalarFieldEnum)[keyof typeof CharacterScalarFieldEnum]


  export const RelationLoadStrategy: {
    query: 'query',
    join: 'join'
  };

  export type RelationLoadStrategy = (typeof RelationLoadStrategy)[keyof typeof RelationLoadStrategy]


  export const CharStatsScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    vitality: 'vitality',
    vigor: 'vigor',
    power: 'power',
    speed: 'speed',
    defense: 'defense',
    initiative: 'initiative',
    size: 'size',
    baseWeight: 'baseWeight',
    carryCap: 'carryCap',
    liftCap: 'liftCap',
    characterId: 'characterId'
  };

  export type CharStatsScalarFieldEnum = (typeof CharStatsScalarFieldEnum)[keyof typeof CharStatsScalarFieldEnum]


  export const LineageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type LineageScalarFieldEnum = (typeof LineageScalarFieldEnum)[keyof typeof LineageScalarFieldEnum]


  export const Character_lineageScalarFieldEnum: {
    id: 'id',
    characterId: 'characterId',
    lineageId: 'lineageId',
    pure: 'pure'
  };

  export type Character_lineageScalarFieldEnum = (typeof Character_lineageScalarFieldEnum)[keyof typeof Character_lineageScalarFieldEnum]


  export const SkillScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description'
  };

  export type SkillScalarFieldEnum = (typeof SkillScalarFieldEnum)[keyof typeof SkillScalarFieldEnum]


  export const Character_skillScalarFieldEnum: {
    id: 'id',
    characterId: 'characterId',
    skillId: 'skillId'
  };

  export type Character_skillScalarFieldEnum = (typeof Character_skillScalarFieldEnum)[keyof typeof Character_skillScalarFieldEnum]


  export const Lineage_skillScalarFieldEnum: {
    id: 'id',
    lineageId: 'lineageId',
    skillId: 'skillId',
    pureSkill: 'pureSkill'
  };

  export type Lineage_skillScalarFieldEnum = (typeof Lineage_skillScalarFieldEnum)[keyof typeof Lineage_skillScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    email: 'email',
    username: 'username',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type characterWhereInput = {
    AND?: characterWhereInput | characterWhereInput[]
    OR?: characterWhereInput[]
    NOT?: characterWhereInput | characterWhereInput[]
    id?: IntFilter<"character"> | number
    createdAt?: DateTimeFilter<"character"> | Date | string
    name?: StringFilter<"character"> | string
    level?: IntFilter<"character"> | number
    experience?: IntFilter<"character"> | number
    tier?: IntFilter<"character"> | number
    agility?: IntFilter<"character"> | number
    body?: IntFilter<"character"> | number
    mind?: IntFilter<"character"> | number
    public?: BoolFilter<"character"> | boolean
    authorId?: IntFilter<"character"> | number
    user?: XOR<UserRelationFilter, userWhereInput>
    skills?: Character_skillListRelationFilter
    lineages?: Character_lineageListRelationFilter
    stats?: XOR<CharStatsNullableRelationFilter, charStatsWhereInput> | null
  }

  export type characterOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    level?: SortOrder
    experience?: SortOrder
    tier?: SortOrder
    agility?: SortOrder
    body?: SortOrder
    mind?: SortOrder
    public?: SortOrder
    authorId?: SortOrder
    user?: userOrderByWithRelationInput
    skills?: character_skillOrderByRelationAggregateInput
    lineages?: character_lineageOrderByRelationAggregateInput
    stats?: charStatsOrderByWithRelationInput
  }

  export type characterWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: characterWhereInput | characterWhereInput[]
    OR?: characterWhereInput[]
    NOT?: characterWhereInput | characterWhereInput[]
    createdAt?: DateTimeFilter<"character"> | Date | string
    name?: StringFilter<"character"> | string
    level?: IntFilter<"character"> | number
    experience?: IntFilter<"character"> | number
    tier?: IntFilter<"character"> | number
    agility?: IntFilter<"character"> | number
    body?: IntFilter<"character"> | number
    mind?: IntFilter<"character"> | number
    public?: BoolFilter<"character"> | boolean
    authorId?: IntFilter<"character"> | number
    user?: XOR<UserRelationFilter, userWhereInput>
    skills?: Character_skillListRelationFilter
    lineages?: Character_lineageListRelationFilter
    stats?: XOR<CharStatsNullableRelationFilter, charStatsWhereInput> | null
  }, "id">

  export type characterOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    level?: SortOrder
    experience?: SortOrder
    tier?: SortOrder
    agility?: SortOrder
    body?: SortOrder
    mind?: SortOrder
    public?: SortOrder
    authorId?: SortOrder
    _count?: characterCountOrderByAggregateInput
    _avg?: characterAvgOrderByAggregateInput
    _max?: characterMaxOrderByAggregateInput
    _min?: characterMinOrderByAggregateInput
    _sum?: characterSumOrderByAggregateInput
  }

  export type characterScalarWhereWithAggregatesInput = {
    AND?: characterScalarWhereWithAggregatesInput | characterScalarWhereWithAggregatesInput[]
    OR?: characterScalarWhereWithAggregatesInput[]
    NOT?: characterScalarWhereWithAggregatesInput | characterScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"character"> | number
    createdAt?: DateTimeWithAggregatesFilter<"character"> | Date | string
    name?: StringWithAggregatesFilter<"character"> | string
    level?: IntWithAggregatesFilter<"character"> | number
    experience?: IntWithAggregatesFilter<"character"> | number
    tier?: IntWithAggregatesFilter<"character"> | number
    agility?: IntWithAggregatesFilter<"character"> | number
    body?: IntWithAggregatesFilter<"character"> | number
    mind?: IntWithAggregatesFilter<"character"> | number
    public?: BoolWithAggregatesFilter<"character"> | boolean
    authorId?: IntWithAggregatesFilter<"character"> | number
  }

  export type charStatsWhereInput = {
    AND?: charStatsWhereInput | charStatsWhereInput[]
    OR?: charStatsWhereInput[]
    NOT?: charStatsWhereInput | charStatsWhereInput[]
    id?: IntFilter<"charStats"> | number
    createdAt?: DateTimeFilter<"charStats"> | Date | string
    vitality?: IntFilter<"charStats"> | number
    vigor?: IntFilter<"charStats"> | number
    power?: IntFilter<"charStats"> | number
    speed?: IntFilter<"charStats"> | number
    defense?: IntFilter<"charStats"> | number
    initiative?: IntFilter<"charStats"> | number
    size?: IntFilter<"charStats"> | number
    baseWeight?: IntFilter<"charStats"> | number
    carryCap?: IntFilter<"charStats"> | number
    liftCap?: IntFilter<"charStats"> | number
    characterId?: IntFilter<"charStats"> | number
    character?: XOR<CharacterRelationFilter, characterWhereInput>
  }

  export type charStatsOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    vitality?: SortOrder
    vigor?: SortOrder
    power?: SortOrder
    speed?: SortOrder
    defense?: SortOrder
    initiative?: SortOrder
    size?: SortOrder
    baseWeight?: SortOrder
    carryCap?: SortOrder
    liftCap?: SortOrder
    characterId?: SortOrder
    character?: characterOrderByWithRelationInput
  }

  export type charStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    characterId?: number
    AND?: charStatsWhereInput | charStatsWhereInput[]
    OR?: charStatsWhereInput[]
    NOT?: charStatsWhereInput | charStatsWhereInput[]
    createdAt?: DateTimeFilter<"charStats"> | Date | string
    vitality?: IntFilter<"charStats"> | number
    vigor?: IntFilter<"charStats"> | number
    power?: IntFilter<"charStats"> | number
    speed?: IntFilter<"charStats"> | number
    defense?: IntFilter<"charStats"> | number
    initiative?: IntFilter<"charStats"> | number
    size?: IntFilter<"charStats"> | number
    baseWeight?: IntFilter<"charStats"> | number
    carryCap?: IntFilter<"charStats"> | number
    liftCap?: IntFilter<"charStats"> | number
    character?: XOR<CharacterRelationFilter, characterWhereInput>
  }, "id" | "characterId">

  export type charStatsOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    vitality?: SortOrder
    vigor?: SortOrder
    power?: SortOrder
    speed?: SortOrder
    defense?: SortOrder
    initiative?: SortOrder
    size?: SortOrder
    baseWeight?: SortOrder
    carryCap?: SortOrder
    liftCap?: SortOrder
    characterId?: SortOrder
    _count?: charStatsCountOrderByAggregateInput
    _avg?: charStatsAvgOrderByAggregateInput
    _max?: charStatsMaxOrderByAggregateInput
    _min?: charStatsMinOrderByAggregateInput
    _sum?: charStatsSumOrderByAggregateInput
  }

  export type charStatsScalarWhereWithAggregatesInput = {
    AND?: charStatsScalarWhereWithAggregatesInput | charStatsScalarWhereWithAggregatesInput[]
    OR?: charStatsScalarWhereWithAggregatesInput[]
    NOT?: charStatsScalarWhereWithAggregatesInput | charStatsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"charStats"> | number
    createdAt?: DateTimeWithAggregatesFilter<"charStats"> | Date | string
    vitality?: IntWithAggregatesFilter<"charStats"> | number
    vigor?: IntWithAggregatesFilter<"charStats"> | number
    power?: IntWithAggregatesFilter<"charStats"> | number
    speed?: IntWithAggregatesFilter<"charStats"> | number
    defense?: IntWithAggregatesFilter<"charStats"> | number
    initiative?: IntWithAggregatesFilter<"charStats"> | number
    size?: IntWithAggregatesFilter<"charStats"> | number
    baseWeight?: IntWithAggregatesFilter<"charStats"> | number
    carryCap?: IntWithAggregatesFilter<"charStats"> | number
    liftCap?: IntWithAggregatesFilter<"charStats"> | number
    characterId?: IntWithAggregatesFilter<"charStats"> | number
  }

  export type lineageWhereInput = {
    AND?: lineageWhereInput | lineageWhereInput[]
    OR?: lineageWhereInput[]
    NOT?: lineageWhereInput | lineageWhereInput[]
    id?: IntFilter<"lineage"> | number
    name?: StringNullableFilter<"lineage"> | string | null
    description?: StringFilter<"lineage"> | string
    characters?: Character_lineageListRelationFilter
    skills?: Lineage_skillListRelationFilter
  }

  export type lineageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrder
    characters?: character_lineageOrderByRelationAggregateInput
    skills?: lineage_skillOrderByRelationAggregateInput
  }

  export type lineageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: lineageWhereInput | lineageWhereInput[]
    OR?: lineageWhereInput[]
    NOT?: lineageWhereInput | lineageWhereInput[]
    name?: StringNullableFilter<"lineage"> | string | null
    description?: StringFilter<"lineage"> | string
    characters?: Character_lineageListRelationFilter
    skills?: Lineage_skillListRelationFilter
  }, "id">

  export type lineageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrder
    _count?: lineageCountOrderByAggregateInput
    _avg?: lineageAvgOrderByAggregateInput
    _max?: lineageMaxOrderByAggregateInput
    _min?: lineageMinOrderByAggregateInput
    _sum?: lineageSumOrderByAggregateInput
  }

  export type lineageScalarWhereWithAggregatesInput = {
    AND?: lineageScalarWhereWithAggregatesInput | lineageScalarWhereWithAggregatesInput[]
    OR?: lineageScalarWhereWithAggregatesInput[]
    NOT?: lineageScalarWhereWithAggregatesInput | lineageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"lineage"> | number
    name?: StringNullableWithAggregatesFilter<"lineage"> | string | null
    description?: StringWithAggregatesFilter<"lineage"> | string
  }

  export type character_lineageWhereInput = {
    AND?: character_lineageWhereInput | character_lineageWhereInput[]
    OR?: character_lineageWhereInput[]
    NOT?: character_lineageWhereInput | character_lineageWhereInput[]
    id?: IntFilter<"character_lineage"> | number
    characterId?: IntFilter<"character_lineage"> | number
    lineageId?: IntFilter<"character_lineage"> | number
    pure?: BoolFilter<"character_lineage"> | boolean
    character?: XOR<CharacterRelationFilter, characterWhereInput>
    lineage?: XOR<LineageRelationFilter, lineageWhereInput>
  }

  export type character_lineageOrderByWithRelationInput = {
    id?: SortOrder
    characterId?: SortOrder
    lineageId?: SortOrder
    pure?: SortOrder
    character?: characterOrderByWithRelationInput
    lineage?: lineageOrderByWithRelationInput
  }

  export type character_lineageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    characterId_lineageId?: character_lineageCharacterIdLineageIdCompoundUniqueInput
    AND?: character_lineageWhereInput | character_lineageWhereInput[]
    OR?: character_lineageWhereInput[]
    NOT?: character_lineageWhereInput | character_lineageWhereInput[]
    characterId?: IntFilter<"character_lineage"> | number
    lineageId?: IntFilter<"character_lineage"> | number
    pure?: BoolFilter<"character_lineage"> | boolean
    character?: XOR<CharacterRelationFilter, characterWhereInput>
    lineage?: XOR<LineageRelationFilter, lineageWhereInput>
  }, "id" | "characterId_lineageId">

  export type character_lineageOrderByWithAggregationInput = {
    id?: SortOrder
    characterId?: SortOrder
    lineageId?: SortOrder
    pure?: SortOrder
    _count?: character_lineageCountOrderByAggregateInput
    _avg?: character_lineageAvgOrderByAggregateInput
    _max?: character_lineageMaxOrderByAggregateInput
    _min?: character_lineageMinOrderByAggregateInput
    _sum?: character_lineageSumOrderByAggregateInput
  }

  export type character_lineageScalarWhereWithAggregatesInput = {
    AND?: character_lineageScalarWhereWithAggregatesInput | character_lineageScalarWhereWithAggregatesInput[]
    OR?: character_lineageScalarWhereWithAggregatesInput[]
    NOT?: character_lineageScalarWhereWithAggregatesInput | character_lineageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"character_lineage"> | number
    characterId?: IntWithAggregatesFilter<"character_lineage"> | number
    lineageId?: IntWithAggregatesFilter<"character_lineage"> | number
    pure?: BoolWithAggregatesFilter<"character_lineage"> | boolean
  }

  export type skillWhereInput = {
    AND?: skillWhereInput | skillWhereInput[]
    OR?: skillWhereInput[]
    NOT?: skillWhereInput | skillWhereInput[]
    id?: IntFilter<"skill"> | number
    name?: StringNullableFilter<"skill"> | string | null
    description?: StringNullableFilter<"skill"> | string | null
    characters?: Character_skillListRelationFilter
    lineages?: Lineage_skillListRelationFilter
  }

  export type skillOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    characters?: character_skillOrderByRelationAggregateInput
    lineages?: lineage_skillOrderByRelationAggregateInput
  }

  export type skillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: skillWhereInput | skillWhereInput[]
    OR?: skillWhereInput[]
    NOT?: skillWhereInput | skillWhereInput[]
    name?: StringNullableFilter<"skill"> | string | null
    description?: StringNullableFilter<"skill"> | string | null
    characters?: Character_skillListRelationFilter
    lineages?: Lineage_skillListRelationFilter
  }, "id">

  export type skillOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _count?: skillCountOrderByAggregateInput
    _avg?: skillAvgOrderByAggregateInput
    _max?: skillMaxOrderByAggregateInput
    _min?: skillMinOrderByAggregateInput
    _sum?: skillSumOrderByAggregateInput
  }

  export type skillScalarWhereWithAggregatesInput = {
    AND?: skillScalarWhereWithAggregatesInput | skillScalarWhereWithAggregatesInput[]
    OR?: skillScalarWhereWithAggregatesInput[]
    NOT?: skillScalarWhereWithAggregatesInput | skillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"skill"> | number
    name?: StringNullableWithAggregatesFilter<"skill"> | string | null
    description?: StringNullableWithAggregatesFilter<"skill"> | string | null
  }

  export type character_skillWhereInput = {
    AND?: character_skillWhereInput | character_skillWhereInput[]
    OR?: character_skillWhereInput[]
    NOT?: character_skillWhereInput | character_skillWhereInput[]
    id?: IntFilter<"character_skill"> | number
    characterId?: IntFilter<"character_skill"> | number
    skillId?: IntFilter<"character_skill"> | number
    character?: XOR<CharacterRelationFilter, characterWhereInput>
    skill?: XOR<SkillRelationFilter, skillWhereInput>
  }

  export type character_skillOrderByWithRelationInput = {
    id?: SortOrder
    characterId?: SortOrder
    skillId?: SortOrder
    character?: characterOrderByWithRelationInput
    skill?: skillOrderByWithRelationInput
  }

  export type character_skillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    characterId_skillId?: character_skillCharacterIdSkillIdCompoundUniqueInput
    AND?: character_skillWhereInput | character_skillWhereInput[]
    OR?: character_skillWhereInput[]
    NOT?: character_skillWhereInput | character_skillWhereInput[]
    characterId?: IntFilter<"character_skill"> | number
    skillId?: IntFilter<"character_skill"> | number
    character?: XOR<CharacterRelationFilter, characterWhereInput>
    skill?: XOR<SkillRelationFilter, skillWhereInput>
  }, "id" | "characterId_skillId">

  export type character_skillOrderByWithAggregationInput = {
    id?: SortOrder
    characterId?: SortOrder
    skillId?: SortOrder
    _count?: character_skillCountOrderByAggregateInput
    _avg?: character_skillAvgOrderByAggregateInput
    _max?: character_skillMaxOrderByAggregateInput
    _min?: character_skillMinOrderByAggregateInput
    _sum?: character_skillSumOrderByAggregateInput
  }

  export type character_skillScalarWhereWithAggregatesInput = {
    AND?: character_skillScalarWhereWithAggregatesInput | character_skillScalarWhereWithAggregatesInput[]
    OR?: character_skillScalarWhereWithAggregatesInput[]
    NOT?: character_skillScalarWhereWithAggregatesInput | character_skillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"character_skill"> | number
    characterId?: IntWithAggregatesFilter<"character_skill"> | number
    skillId?: IntWithAggregatesFilter<"character_skill"> | number
  }

  export type lineage_skillWhereInput = {
    AND?: lineage_skillWhereInput | lineage_skillWhereInput[]
    OR?: lineage_skillWhereInput[]
    NOT?: lineage_skillWhereInput | lineage_skillWhereInput[]
    id?: IntFilter<"lineage_skill"> | number
    lineageId?: IntFilter<"lineage_skill"> | number
    skillId?: IntFilter<"lineage_skill"> | number
    pureSkill?: BoolFilter<"lineage_skill"> | boolean
    lineage?: XOR<LineageRelationFilter, lineageWhereInput>
    skill?: XOR<SkillRelationFilter, skillWhereInput>
  }

  export type lineage_skillOrderByWithRelationInput = {
    id?: SortOrder
    lineageId?: SortOrder
    skillId?: SortOrder
    pureSkill?: SortOrder
    lineage?: lineageOrderByWithRelationInput
    skill?: skillOrderByWithRelationInput
  }

  export type lineage_skillWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    lineageId_skillId?: lineage_skillLineageIdSkillIdCompoundUniqueInput
    AND?: lineage_skillWhereInput | lineage_skillWhereInput[]
    OR?: lineage_skillWhereInput[]
    NOT?: lineage_skillWhereInput | lineage_skillWhereInput[]
    lineageId?: IntFilter<"lineage_skill"> | number
    skillId?: IntFilter<"lineage_skill"> | number
    pureSkill?: BoolFilter<"lineage_skill"> | boolean
    lineage?: XOR<LineageRelationFilter, lineageWhereInput>
    skill?: XOR<SkillRelationFilter, skillWhereInput>
  }, "id" | "lineageId_skillId">

  export type lineage_skillOrderByWithAggregationInput = {
    id?: SortOrder
    lineageId?: SortOrder
    skillId?: SortOrder
    pureSkill?: SortOrder
    _count?: lineage_skillCountOrderByAggregateInput
    _avg?: lineage_skillAvgOrderByAggregateInput
    _max?: lineage_skillMaxOrderByAggregateInput
    _min?: lineage_skillMinOrderByAggregateInput
    _sum?: lineage_skillSumOrderByAggregateInput
  }

  export type lineage_skillScalarWhereWithAggregatesInput = {
    AND?: lineage_skillScalarWhereWithAggregatesInput | lineage_skillScalarWhereWithAggregatesInput[]
    OR?: lineage_skillScalarWhereWithAggregatesInput[]
    NOT?: lineage_skillScalarWhereWithAggregatesInput | lineage_skillScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"lineage_skill"> | number
    lineageId?: IntWithAggregatesFilter<"lineage_skill"> | number
    skillId?: IntWithAggregatesFilter<"lineage_skill"> | number
    pureSkill?: BoolWithAggregatesFilter<"lineage_skill"> | boolean
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: IntFilter<"user"> | number
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    email?: StringFilter<"user"> | string
    username?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    characters?: CharacterListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    characters?: characterOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    username?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    characters?: CharacterListRelationFilter
  }, "id" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user"> | number
    createdAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    email?: StringWithAggregatesFilter<"user"> | string
    username?: StringWithAggregatesFilter<"user"> | string
    password?: StringWithAggregatesFilter<"user"> | string
  }

  export type characterCreateInput = {
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    user: userCreateNestedOneWithoutCharactersInput
    skills?: character_skillCreateNestedManyWithoutCharacterInput
    lineages?: character_lineageCreateNestedManyWithoutCharacterInput
    stats?: charStatsCreateNestedOneWithoutCharacterInput
  }

  export type characterUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    authorId: number
    skills?: character_skillUncheckedCreateNestedManyWithoutCharacterInput
    lineages?: character_lineageUncheckedCreateNestedManyWithoutCharacterInput
    stats?: charStatsUncheckedCreateNestedOneWithoutCharacterInput
  }

  export type characterUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    user?: userUpdateOneRequiredWithoutCharactersNestedInput
    skills?: character_skillUpdateManyWithoutCharacterNestedInput
    lineages?: character_lineageUpdateManyWithoutCharacterNestedInput
    stats?: charStatsUpdateOneWithoutCharacterNestedInput
  }

  export type characterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    skills?: character_skillUncheckedUpdateManyWithoutCharacterNestedInput
    lineages?: character_lineageUncheckedUpdateManyWithoutCharacterNestedInput
    stats?: charStatsUncheckedUpdateOneWithoutCharacterNestedInput
  }

  export type characterCreateManyInput = {
    id?: number
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    authorId: number
  }

  export type characterUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
  }

  export type characterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
  }

  export type charStatsCreateInput = {
    createdAt?: Date | string
    vitality: number
    vigor: number
    power: number
    speed: number
    defense: number
    initiative: number
    size: number
    baseWeight: number
    carryCap: number
    liftCap: number
    character: characterCreateNestedOneWithoutStatsInput
  }

  export type charStatsUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    vitality: number
    vigor: number
    power: number
    speed: number
    defense: number
    initiative: number
    size: number
    baseWeight: number
    carryCap: number
    liftCap: number
    characterId: number
  }

  export type charStatsUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vitality?: IntFieldUpdateOperationsInput | number
    vigor?: IntFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    speed?: IntFieldUpdateOperationsInput | number
    defense?: IntFieldUpdateOperationsInput | number
    initiative?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    baseWeight?: IntFieldUpdateOperationsInput | number
    carryCap?: IntFieldUpdateOperationsInput | number
    liftCap?: IntFieldUpdateOperationsInput | number
    character?: characterUpdateOneRequiredWithoutStatsNestedInput
  }

  export type charStatsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vitality?: IntFieldUpdateOperationsInput | number
    vigor?: IntFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    speed?: IntFieldUpdateOperationsInput | number
    defense?: IntFieldUpdateOperationsInput | number
    initiative?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    baseWeight?: IntFieldUpdateOperationsInput | number
    carryCap?: IntFieldUpdateOperationsInput | number
    liftCap?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
  }

  export type charStatsCreateManyInput = {
    id?: number
    createdAt?: Date | string
    vitality: number
    vigor: number
    power: number
    speed: number
    defense: number
    initiative: number
    size: number
    baseWeight: number
    carryCap: number
    liftCap: number
    characterId: number
  }

  export type charStatsUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vitality?: IntFieldUpdateOperationsInput | number
    vigor?: IntFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    speed?: IntFieldUpdateOperationsInput | number
    defense?: IntFieldUpdateOperationsInput | number
    initiative?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    baseWeight?: IntFieldUpdateOperationsInput | number
    carryCap?: IntFieldUpdateOperationsInput | number
    liftCap?: IntFieldUpdateOperationsInput | number
  }

  export type charStatsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vitality?: IntFieldUpdateOperationsInput | number
    vigor?: IntFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    speed?: IntFieldUpdateOperationsInput | number
    defense?: IntFieldUpdateOperationsInput | number
    initiative?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    baseWeight?: IntFieldUpdateOperationsInput | number
    carryCap?: IntFieldUpdateOperationsInput | number
    liftCap?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
  }

  export type lineageCreateInput = {
    name?: string | null
    description: string
    characters?: character_lineageCreateNestedManyWithoutLineageInput
    skills?: lineage_skillCreateNestedManyWithoutLineageInput
  }

  export type lineageUncheckedCreateInput = {
    id?: number
    name?: string | null
    description: string
    characters?: character_lineageUncheckedCreateNestedManyWithoutLineageInput
    skills?: lineage_skillUncheckedCreateNestedManyWithoutLineageInput
  }

  export type lineageUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    characters?: character_lineageUpdateManyWithoutLineageNestedInput
    skills?: lineage_skillUpdateManyWithoutLineageNestedInput
  }

  export type lineageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    characters?: character_lineageUncheckedUpdateManyWithoutLineageNestedInput
    skills?: lineage_skillUncheckedUpdateManyWithoutLineageNestedInput
  }

  export type lineageCreateManyInput = {
    id?: number
    name?: string | null
    description: string
  }

  export type lineageUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
  }

  export type lineageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
  }

  export type character_lineageCreateInput = {
    pure?: boolean
    character: characterCreateNestedOneWithoutLineagesInput
    lineage: lineageCreateNestedOneWithoutCharactersInput
  }

  export type character_lineageUncheckedCreateInput = {
    id?: number
    characterId: number
    lineageId: number
    pure?: boolean
  }

  export type character_lineageUpdateInput = {
    pure?: BoolFieldUpdateOperationsInput | boolean
    character?: characterUpdateOneRequiredWithoutLineagesNestedInput
    lineage?: lineageUpdateOneRequiredWithoutCharactersNestedInput
  }

  export type character_lineageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
    lineageId?: IntFieldUpdateOperationsInput | number
    pure?: BoolFieldUpdateOperationsInput | boolean
  }

  export type character_lineageCreateManyInput = {
    id?: number
    characterId: number
    lineageId: number
    pure?: boolean
  }

  export type character_lineageUpdateManyMutationInput = {
    pure?: BoolFieldUpdateOperationsInput | boolean
  }

  export type character_lineageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
    lineageId?: IntFieldUpdateOperationsInput | number
    pure?: BoolFieldUpdateOperationsInput | boolean
  }

  export type skillCreateInput = {
    name?: string | null
    description?: string | null
    characters?: character_skillCreateNestedManyWithoutSkillInput
    lineages?: lineage_skillCreateNestedManyWithoutSkillInput
  }

  export type skillUncheckedCreateInput = {
    id?: number
    name?: string | null
    description?: string | null
    characters?: character_skillUncheckedCreateNestedManyWithoutSkillInput
    lineages?: lineage_skillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type skillUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    characters?: character_skillUpdateManyWithoutSkillNestedInput
    lineages?: lineage_skillUpdateManyWithoutSkillNestedInput
  }

  export type skillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    characters?: character_skillUncheckedUpdateManyWithoutSkillNestedInput
    lineages?: lineage_skillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type skillCreateManyInput = {
    id?: number
    name?: string | null
    description?: string | null
  }

  export type skillUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type skillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type character_skillCreateInput = {
    character: characterCreateNestedOneWithoutSkillsInput
    skill: skillCreateNestedOneWithoutCharactersInput
  }

  export type character_skillUncheckedCreateInput = {
    id?: number
    characterId: number
    skillId: number
  }

  export type character_skillUpdateInput = {
    character?: characterUpdateOneRequiredWithoutSkillsNestedInput
    skill?: skillUpdateOneRequiredWithoutCharactersNestedInput
  }

  export type character_skillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type character_skillCreateManyInput = {
    id?: number
    characterId: number
    skillId: number
  }

  export type character_skillUpdateManyMutationInput = {

  }

  export type character_skillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type lineage_skillCreateInput = {
    pureSkill: boolean
    lineage: lineageCreateNestedOneWithoutSkillsInput
    skill: skillCreateNestedOneWithoutLineagesInput
  }

  export type lineage_skillUncheckedCreateInput = {
    id?: number
    lineageId: number
    skillId: number
    pureSkill: boolean
  }

  export type lineage_skillUpdateInput = {
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
    lineage?: lineageUpdateOneRequiredWithoutSkillsNestedInput
    skill?: skillUpdateOneRequiredWithoutLineagesNestedInput
  }

  export type lineage_skillUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    lineageId?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
  }

  export type lineage_skillCreateManyInput = {
    id?: number
    lineageId: number
    skillId: number
    pureSkill: boolean
  }

  export type lineage_skillUpdateManyMutationInput = {
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
  }

  export type lineage_skillUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    lineageId?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
  }

  export type userCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    password: string
    characters?: characterCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    password: string
    characters?: characterUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    characters?: characterUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    characters?: characterUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    password: string
  }

  export type userUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type Character_skillListRelationFilter = {
    every?: character_skillWhereInput
    some?: character_skillWhereInput
    none?: character_skillWhereInput
  }

  export type Character_lineageListRelationFilter = {
    every?: character_lineageWhereInput
    some?: character_lineageWhereInput
    none?: character_lineageWhereInput
  }

  export type CharStatsNullableRelationFilter = {
    is?: charStatsWhereInput | null
    isNot?: charStatsWhereInput | null
  }

  export type character_skillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type character_lineageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type characterCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    level?: SortOrder
    experience?: SortOrder
    tier?: SortOrder
    agility?: SortOrder
    body?: SortOrder
    mind?: SortOrder
    public?: SortOrder
    authorId?: SortOrder
  }

  export type characterAvgOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    experience?: SortOrder
    tier?: SortOrder
    agility?: SortOrder
    body?: SortOrder
    mind?: SortOrder
    authorId?: SortOrder
  }

  export type characterMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    level?: SortOrder
    experience?: SortOrder
    tier?: SortOrder
    agility?: SortOrder
    body?: SortOrder
    mind?: SortOrder
    public?: SortOrder
    authorId?: SortOrder
  }

  export type characterMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    level?: SortOrder
    experience?: SortOrder
    tier?: SortOrder
    agility?: SortOrder
    body?: SortOrder
    mind?: SortOrder
    public?: SortOrder
    authorId?: SortOrder
  }

  export type characterSumOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    experience?: SortOrder
    tier?: SortOrder
    agility?: SortOrder
    body?: SortOrder
    mind?: SortOrder
    authorId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CharacterRelationFilter = {
    is?: characterWhereInput
    isNot?: characterWhereInput
  }

  export type charStatsCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    vitality?: SortOrder
    vigor?: SortOrder
    power?: SortOrder
    speed?: SortOrder
    defense?: SortOrder
    initiative?: SortOrder
    size?: SortOrder
    baseWeight?: SortOrder
    carryCap?: SortOrder
    liftCap?: SortOrder
    characterId?: SortOrder
  }

  export type charStatsAvgOrderByAggregateInput = {
    id?: SortOrder
    vitality?: SortOrder
    vigor?: SortOrder
    power?: SortOrder
    speed?: SortOrder
    defense?: SortOrder
    initiative?: SortOrder
    size?: SortOrder
    baseWeight?: SortOrder
    carryCap?: SortOrder
    liftCap?: SortOrder
    characterId?: SortOrder
  }

  export type charStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    vitality?: SortOrder
    vigor?: SortOrder
    power?: SortOrder
    speed?: SortOrder
    defense?: SortOrder
    initiative?: SortOrder
    size?: SortOrder
    baseWeight?: SortOrder
    carryCap?: SortOrder
    liftCap?: SortOrder
    characterId?: SortOrder
  }

  export type charStatsMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    vitality?: SortOrder
    vigor?: SortOrder
    power?: SortOrder
    speed?: SortOrder
    defense?: SortOrder
    initiative?: SortOrder
    size?: SortOrder
    baseWeight?: SortOrder
    carryCap?: SortOrder
    liftCap?: SortOrder
    characterId?: SortOrder
  }

  export type charStatsSumOrderByAggregateInput = {
    id?: SortOrder
    vitality?: SortOrder
    vigor?: SortOrder
    power?: SortOrder
    speed?: SortOrder
    defense?: SortOrder
    initiative?: SortOrder
    size?: SortOrder
    baseWeight?: SortOrder
    carryCap?: SortOrder
    liftCap?: SortOrder
    characterId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Lineage_skillListRelationFilter = {
    every?: lineage_skillWhereInput
    some?: lineage_skillWhereInput
    none?: lineage_skillWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type lineage_skillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type lineageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type lineageAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type lineageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type lineageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type lineageSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type LineageRelationFilter = {
    is?: lineageWhereInput
    isNot?: lineageWhereInput
  }

  export type character_lineageCharacterIdLineageIdCompoundUniqueInput = {
    characterId: number
    lineageId: number
  }

  export type character_lineageCountOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    lineageId?: SortOrder
    pure?: SortOrder
  }

  export type character_lineageAvgOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    lineageId?: SortOrder
  }

  export type character_lineageMaxOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    lineageId?: SortOrder
    pure?: SortOrder
  }

  export type character_lineageMinOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    lineageId?: SortOrder
    pure?: SortOrder
  }

  export type character_lineageSumOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    lineageId?: SortOrder
  }

  export type skillCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type skillAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type skillMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type skillMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
  }

  export type skillSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SkillRelationFilter = {
    is?: skillWhereInput
    isNot?: skillWhereInput
  }

  export type character_skillCharacterIdSkillIdCompoundUniqueInput = {
    characterId: number
    skillId: number
  }

  export type character_skillCountOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    skillId?: SortOrder
  }

  export type character_skillAvgOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    skillId?: SortOrder
  }

  export type character_skillMaxOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    skillId?: SortOrder
  }

  export type character_skillMinOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    skillId?: SortOrder
  }

  export type character_skillSumOrderByAggregateInput = {
    id?: SortOrder
    characterId?: SortOrder
    skillId?: SortOrder
  }

  export type lineage_skillLineageIdSkillIdCompoundUniqueInput = {
    lineageId: number
    skillId: number
  }

  export type lineage_skillCountOrderByAggregateInput = {
    id?: SortOrder
    lineageId?: SortOrder
    skillId?: SortOrder
    pureSkill?: SortOrder
  }

  export type lineage_skillAvgOrderByAggregateInput = {
    id?: SortOrder
    lineageId?: SortOrder
    skillId?: SortOrder
  }

  export type lineage_skillMaxOrderByAggregateInput = {
    id?: SortOrder
    lineageId?: SortOrder
    skillId?: SortOrder
    pureSkill?: SortOrder
  }

  export type lineage_skillMinOrderByAggregateInput = {
    id?: SortOrder
    lineageId?: SortOrder
    skillId?: SortOrder
    pureSkill?: SortOrder
  }

  export type lineage_skillSumOrderByAggregateInput = {
    id?: SortOrder
    lineageId?: SortOrder
    skillId?: SortOrder
  }

  export type CharacterListRelationFilter = {
    every?: characterWhereInput
    some?: characterWhereInput
    none?: characterWhereInput
  }

  export type characterOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type userCreateNestedOneWithoutCharactersInput = {
    create?: XOR<userCreateWithoutCharactersInput, userUncheckedCreateWithoutCharactersInput>
    connectOrCreate?: userCreateOrConnectWithoutCharactersInput
    connect?: userWhereUniqueInput
  }

  export type character_skillCreateNestedManyWithoutCharacterInput = {
    create?: XOR<character_skillCreateWithoutCharacterInput, character_skillUncheckedCreateWithoutCharacterInput> | character_skillCreateWithoutCharacterInput[] | character_skillUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: character_skillCreateOrConnectWithoutCharacterInput | character_skillCreateOrConnectWithoutCharacterInput[]
    createMany?: character_skillCreateManyCharacterInputEnvelope
    connect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
  }

  export type character_lineageCreateNestedManyWithoutCharacterInput = {
    create?: XOR<character_lineageCreateWithoutCharacterInput, character_lineageUncheckedCreateWithoutCharacterInput> | character_lineageCreateWithoutCharacterInput[] | character_lineageUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: character_lineageCreateOrConnectWithoutCharacterInput | character_lineageCreateOrConnectWithoutCharacterInput[]
    createMany?: character_lineageCreateManyCharacterInputEnvelope
    connect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
  }

  export type charStatsCreateNestedOneWithoutCharacterInput = {
    create?: XOR<charStatsCreateWithoutCharacterInput, charStatsUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: charStatsCreateOrConnectWithoutCharacterInput
    connect?: charStatsWhereUniqueInput
  }

  export type character_skillUncheckedCreateNestedManyWithoutCharacterInput = {
    create?: XOR<character_skillCreateWithoutCharacterInput, character_skillUncheckedCreateWithoutCharacterInput> | character_skillCreateWithoutCharacterInput[] | character_skillUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: character_skillCreateOrConnectWithoutCharacterInput | character_skillCreateOrConnectWithoutCharacterInput[]
    createMany?: character_skillCreateManyCharacterInputEnvelope
    connect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
  }

  export type character_lineageUncheckedCreateNestedManyWithoutCharacterInput = {
    create?: XOR<character_lineageCreateWithoutCharacterInput, character_lineageUncheckedCreateWithoutCharacterInput> | character_lineageCreateWithoutCharacterInput[] | character_lineageUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: character_lineageCreateOrConnectWithoutCharacterInput | character_lineageCreateOrConnectWithoutCharacterInput[]
    createMany?: character_lineageCreateManyCharacterInputEnvelope
    connect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
  }

  export type charStatsUncheckedCreateNestedOneWithoutCharacterInput = {
    create?: XOR<charStatsCreateWithoutCharacterInput, charStatsUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: charStatsCreateOrConnectWithoutCharacterInput
    connect?: charStatsWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type userUpdateOneRequiredWithoutCharactersNestedInput = {
    create?: XOR<userCreateWithoutCharactersInput, userUncheckedCreateWithoutCharactersInput>
    connectOrCreate?: userCreateOrConnectWithoutCharactersInput
    upsert?: userUpsertWithoutCharactersInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutCharactersInput, userUpdateWithoutCharactersInput>, userUncheckedUpdateWithoutCharactersInput>
  }

  export type character_skillUpdateManyWithoutCharacterNestedInput = {
    create?: XOR<character_skillCreateWithoutCharacterInput, character_skillUncheckedCreateWithoutCharacterInput> | character_skillCreateWithoutCharacterInput[] | character_skillUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: character_skillCreateOrConnectWithoutCharacterInput | character_skillCreateOrConnectWithoutCharacterInput[]
    upsert?: character_skillUpsertWithWhereUniqueWithoutCharacterInput | character_skillUpsertWithWhereUniqueWithoutCharacterInput[]
    createMany?: character_skillCreateManyCharacterInputEnvelope
    set?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    disconnect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    delete?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    connect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    update?: character_skillUpdateWithWhereUniqueWithoutCharacterInput | character_skillUpdateWithWhereUniqueWithoutCharacterInput[]
    updateMany?: character_skillUpdateManyWithWhereWithoutCharacterInput | character_skillUpdateManyWithWhereWithoutCharacterInput[]
    deleteMany?: character_skillScalarWhereInput | character_skillScalarWhereInput[]
  }

  export type character_lineageUpdateManyWithoutCharacterNestedInput = {
    create?: XOR<character_lineageCreateWithoutCharacterInput, character_lineageUncheckedCreateWithoutCharacterInput> | character_lineageCreateWithoutCharacterInput[] | character_lineageUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: character_lineageCreateOrConnectWithoutCharacterInput | character_lineageCreateOrConnectWithoutCharacterInput[]
    upsert?: character_lineageUpsertWithWhereUniqueWithoutCharacterInput | character_lineageUpsertWithWhereUniqueWithoutCharacterInput[]
    createMany?: character_lineageCreateManyCharacterInputEnvelope
    set?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    disconnect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    delete?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    connect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    update?: character_lineageUpdateWithWhereUniqueWithoutCharacterInput | character_lineageUpdateWithWhereUniqueWithoutCharacterInput[]
    updateMany?: character_lineageUpdateManyWithWhereWithoutCharacterInput | character_lineageUpdateManyWithWhereWithoutCharacterInput[]
    deleteMany?: character_lineageScalarWhereInput | character_lineageScalarWhereInput[]
  }

  export type charStatsUpdateOneWithoutCharacterNestedInput = {
    create?: XOR<charStatsCreateWithoutCharacterInput, charStatsUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: charStatsCreateOrConnectWithoutCharacterInput
    upsert?: charStatsUpsertWithoutCharacterInput
    disconnect?: charStatsWhereInput | boolean
    delete?: charStatsWhereInput | boolean
    connect?: charStatsWhereUniqueInput
    update?: XOR<XOR<charStatsUpdateToOneWithWhereWithoutCharacterInput, charStatsUpdateWithoutCharacterInput>, charStatsUncheckedUpdateWithoutCharacterInput>
  }

  export type character_skillUncheckedUpdateManyWithoutCharacterNestedInput = {
    create?: XOR<character_skillCreateWithoutCharacterInput, character_skillUncheckedCreateWithoutCharacterInput> | character_skillCreateWithoutCharacterInput[] | character_skillUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: character_skillCreateOrConnectWithoutCharacterInput | character_skillCreateOrConnectWithoutCharacterInput[]
    upsert?: character_skillUpsertWithWhereUniqueWithoutCharacterInput | character_skillUpsertWithWhereUniqueWithoutCharacterInput[]
    createMany?: character_skillCreateManyCharacterInputEnvelope
    set?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    disconnect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    delete?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    connect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    update?: character_skillUpdateWithWhereUniqueWithoutCharacterInput | character_skillUpdateWithWhereUniqueWithoutCharacterInput[]
    updateMany?: character_skillUpdateManyWithWhereWithoutCharacterInput | character_skillUpdateManyWithWhereWithoutCharacterInput[]
    deleteMany?: character_skillScalarWhereInput | character_skillScalarWhereInput[]
  }

  export type character_lineageUncheckedUpdateManyWithoutCharacterNestedInput = {
    create?: XOR<character_lineageCreateWithoutCharacterInput, character_lineageUncheckedCreateWithoutCharacterInput> | character_lineageCreateWithoutCharacterInput[] | character_lineageUncheckedCreateWithoutCharacterInput[]
    connectOrCreate?: character_lineageCreateOrConnectWithoutCharacterInput | character_lineageCreateOrConnectWithoutCharacterInput[]
    upsert?: character_lineageUpsertWithWhereUniqueWithoutCharacterInput | character_lineageUpsertWithWhereUniqueWithoutCharacterInput[]
    createMany?: character_lineageCreateManyCharacterInputEnvelope
    set?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    disconnect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    delete?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    connect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    update?: character_lineageUpdateWithWhereUniqueWithoutCharacterInput | character_lineageUpdateWithWhereUniqueWithoutCharacterInput[]
    updateMany?: character_lineageUpdateManyWithWhereWithoutCharacterInput | character_lineageUpdateManyWithWhereWithoutCharacterInput[]
    deleteMany?: character_lineageScalarWhereInput | character_lineageScalarWhereInput[]
  }

  export type charStatsUncheckedUpdateOneWithoutCharacterNestedInput = {
    create?: XOR<charStatsCreateWithoutCharacterInput, charStatsUncheckedCreateWithoutCharacterInput>
    connectOrCreate?: charStatsCreateOrConnectWithoutCharacterInput
    upsert?: charStatsUpsertWithoutCharacterInput
    disconnect?: charStatsWhereInput | boolean
    delete?: charStatsWhereInput | boolean
    connect?: charStatsWhereUniqueInput
    update?: XOR<XOR<charStatsUpdateToOneWithWhereWithoutCharacterInput, charStatsUpdateWithoutCharacterInput>, charStatsUncheckedUpdateWithoutCharacterInput>
  }

  export type characterCreateNestedOneWithoutStatsInput = {
    create?: XOR<characterCreateWithoutStatsInput, characterUncheckedCreateWithoutStatsInput>
    connectOrCreate?: characterCreateOrConnectWithoutStatsInput
    connect?: characterWhereUniqueInput
  }

  export type characterUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<characterCreateWithoutStatsInput, characterUncheckedCreateWithoutStatsInput>
    connectOrCreate?: characterCreateOrConnectWithoutStatsInput
    upsert?: characterUpsertWithoutStatsInput
    connect?: characterWhereUniqueInput
    update?: XOR<XOR<characterUpdateToOneWithWhereWithoutStatsInput, characterUpdateWithoutStatsInput>, characterUncheckedUpdateWithoutStatsInput>
  }

  export type character_lineageCreateNestedManyWithoutLineageInput = {
    create?: XOR<character_lineageCreateWithoutLineageInput, character_lineageUncheckedCreateWithoutLineageInput> | character_lineageCreateWithoutLineageInput[] | character_lineageUncheckedCreateWithoutLineageInput[]
    connectOrCreate?: character_lineageCreateOrConnectWithoutLineageInput | character_lineageCreateOrConnectWithoutLineageInput[]
    createMany?: character_lineageCreateManyLineageInputEnvelope
    connect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
  }

  export type lineage_skillCreateNestedManyWithoutLineageInput = {
    create?: XOR<lineage_skillCreateWithoutLineageInput, lineage_skillUncheckedCreateWithoutLineageInput> | lineage_skillCreateWithoutLineageInput[] | lineage_skillUncheckedCreateWithoutLineageInput[]
    connectOrCreate?: lineage_skillCreateOrConnectWithoutLineageInput | lineage_skillCreateOrConnectWithoutLineageInput[]
    createMany?: lineage_skillCreateManyLineageInputEnvelope
    connect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
  }

  export type character_lineageUncheckedCreateNestedManyWithoutLineageInput = {
    create?: XOR<character_lineageCreateWithoutLineageInput, character_lineageUncheckedCreateWithoutLineageInput> | character_lineageCreateWithoutLineageInput[] | character_lineageUncheckedCreateWithoutLineageInput[]
    connectOrCreate?: character_lineageCreateOrConnectWithoutLineageInput | character_lineageCreateOrConnectWithoutLineageInput[]
    createMany?: character_lineageCreateManyLineageInputEnvelope
    connect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
  }

  export type lineage_skillUncheckedCreateNestedManyWithoutLineageInput = {
    create?: XOR<lineage_skillCreateWithoutLineageInput, lineage_skillUncheckedCreateWithoutLineageInput> | lineage_skillCreateWithoutLineageInput[] | lineage_skillUncheckedCreateWithoutLineageInput[]
    connectOrCreate?: lineage_skillCreateOrConnectWithoutLineageInput | lineage_skillCreateOrConnectWithoutLineageInput[]
    createMany?: lineage_skillCreateManyLineageInputEnvelope
    connect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type character_lineageUpdateManyWithoutLineageNestedInput = {
    create?: XOR<character_lineageCreateWithoutLineageInput, character_lineageUncheckedCreateWithoutLineageInput> | character_lineageCreateWithoutLineageInput[] | character_lineageUncheckedCreateWithoutLineageInput[]
    connectOrCreate?: character_lineageCreateOrConnectWithoutLineageInput | character_lineageCreateOrConnectWithoutLineageInput[]
    upsert?: character_lineageUpsertWithWhereUniqueWithoutLineageInput | character_lineageUpsertWithWhereUniqueWithoutLineageInput[]
    createMany?: character_lineageCreateManyLineageInputEnvelope
    set?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    disconnect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    delete?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    connect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    update?: character_lineageUpdateWithWhereUniqueWithoutLineageInput | character_lineageUpdateWithWhereUniqueWithoutLineageInput[]
    updateMany?: character_lineageUpdateManyWithWhereWithoutLineageInput | character_lineageUpdateManyWithWhereWithoutLineageInput[]
    deleteMany?: character_lineageScalarWhereInput | character_lineageScalarWhereInput[]
  }

  export type lineage_skillUpdateManyWithoutLineageNestedInput = {
    create?: XOR<lineage_skillCreateWithoutLineageInput, lineage_skillUncheckedCreateWithoutLineageInput> | lineage_skillCreateWithoutLineageInput[] | lineage_skillUncheckedCreateWithoutLineageInput[]
    connectOrCreate?: lineage_skillCreateOrConnectWithoutLineageInput | lineage_skillCreateOrConnectWithoutLineageInput[]
    upsert?: lineage_skillUpsertWithWhereUniqueWithoutLineageInput | lineage_skillUpsertWithWhereUniqueWithoutLineageInput[]
    createMany?: lineage_skillCreateManyLineageInputEnvelope
    set?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    disconnect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    delete?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    connect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    update?: lineage_skillUpdateWithWhereUniqueWithoutLineageInput | lineage_skillUpdateWithWhereUniqueWithoutLineageInput[]
    updateMany?: lineage_skillUpdateManyWithWhereWithoutLineageInput | lineage_skillUpdateManyWithWhereWithoutLineageInput[]
    deleteMany?: lineage_skillScalarWhereInput | lineage_skillScalarWhereInput[]
  }

  export type character_lineageUncheckedUpdateManyWithoutLineageNestedInput = {
    create?: XOR<character_lineageCreateWithoutLineageInput, character_lineageUncheckedCreateWithoutLineageInput> | character_lineageCreateWithoutLineageInput[] | character_lineageUncheckedCreateWithoutLineageInput[]
    connectOrCreate?: character_lineageCreateOrConnectWithoutLineageInput | character_lineageCreateOrConnectWithoutLineageInput[]
    upsert?: character_lineageUpsertWithWhereUniqueWithoutLineageInput | character_lineageUpsertWithWhereUniqueWithoutLineageInput[]
    createMany?: character_lineageCreateManyLineageInputEnvelope
    set?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    disconnect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    delete?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    connect?: character_lineageWhereUniqueInput | character_lineageWhereUniqueInput[]
    update?: character_lineageUpdateWithWhereUniqueWithoutLineageInput | character_lineageUpdateWithWhereUniqueWithoutLineageInput[]
    updateMany?: character_lineageUpdateManyWithWhereWithoutLineageInput | character_lineageUpdateManyWithWhereWithoutLineageInput[]
    deleteMany?: character_lineageScalarWhereInput | character_lineageScalarWhereInput[]
  }

  export type lineage_skillUncheckedUpdateManyWithoutLineageNestedInput = {
    create?: XOR<lineage_skillCreateWithoutLineageInput, lineage_skillUncheckedCreateWithoutLineageInput> | lineage_skillCreateWithoutLineageInput[] | lineage_skillUncheckedCreateWithoutLineageInput[]
    connectOrCreate?: lineage_skillCreateOrConnectWithoutLineageInput | lineage_skillCreateOrConnectWithoutLineageInput[]
    upsert?: lineage_skillUpsertWithWhereUniqueWithoutLineageInput | lineage_skillUpsertWithWhereUniqueWithoutLineageInput[]
    createMany?: lineage_skillCreateManyLineageInputEnvelope
    set?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    disconnect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    delete?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    connect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    update?: lineage_skillUpdateWithWhereUniqueWithoutLineageInput | lineage_skillUpdateWithWhereUniqueWithoutLineageInput[]
    updateMany?: lineage_skillUpdateManyWithWhereWithoutLineageInput | lineage_skillUpdateManyWithWhereWithoutLineageInput[]
    deleteMany?: lineage_skillScalarWhereInput | lineage_skillScalarWhereInput[]
  }

  export type characterCreateNestedOneWithoutLineagesInput = {
    create?: XOR<characterCreateWithoutLineagesInput, characterUncheckedCreateWithoutLineagesInput>
    connectOrCreate?: characterCreateOrConnectWithoutLineagesInput
    connect?: characterWhereUniqueInput
  }

  export type lineageCreateNestedOneWithoutCharactersInput = {
    create?: XOR<lineageCreateWithoutCharactersInput, lineageUncheckedCreateWithoutCharactersInput>
    connectOrCreate?: lineageCreateOrConnectWithoutCharactersInput
    connect?: lineageWhereUniqueInput
  }

  export type characterUpdateOneRequiredWithoutLineagesNestedInput = {
    create?: XOR<characterCreateWithoutLineagesInput, characterUncheckedCreateWithoutLineagesInput>
    connectOrCreate?: characterCreateOrConnectWithoutLineagesInput
    upsert?: characterUpsertWithoutLineagesInput
    connect?: characterWhereUniqueInput
    update?: XOR<XOR<characterUpdateToOneWithWhereWithoutLineagesInput, characterUpdateWithoutLineagesInput>, characterUncheckedUpdateWithoutLineagesInput>
  }

  export type lineageUpdateOneRequiredWithoutCharactersNestedInput = {
    create?: XOR<lineageCreateWithoutCharactersInput, lineageUncheckedCreateWithoutCharactersInput>
    connectOrCreate?: lineageCreateOrConnectWithoutCharactersInput
    upsert?: lineageUpsertWithoutCharactersInput
    connect?: lineageWhereUniqueInput
    update?: XOR<XOR<lineageUpdateToOneWithWhereWithoutCharactersInput, lineageUpdateWithoutCharactersInput>, lineageUncheckedUpdateWithoutCharactersInput>
  }

  export type character_skillCreateNestedManyWithoutSkillInput = {
    create?: XOR<character_skillCreateWithoutSkillInput, character_skillUncheckedCreateWithoutSkillInput> | character_skillCreateWithoutSkillInput[] | character_skillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: character_skillCreateOrConnectWithoutSkillInput | character_skillCreateOrConnectWithoutSkillInput[]
    createMany?: character_skillCreateManySkillInputEnvelope
    connect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
  }

  export type lineage_skillCreateNestedManyWithoutSkillInput = {
    create?: XOR<lineage_skillCreateWithoutSkillInput, lineage_skillUncheckedCreateWithoutSkillInput> | lineage_skillCreateWithoutSkillInput[] | lineage_skillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: lineage_skillCreateOrConnectWithoutSkillInput | lineage_skillCreateOrConnectWithoutSkillInput[]
    createMany?: lineage_skillCreateManySkillInputEnvelope
    connect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
  }

  export type character_skillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<character_skillCreateWithoutSkillInput, character_skillUncheckedCreateWithoutSkillInput> | character_skillCreateWithoutSkillInput[] | character_skillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: character_skillCreateOrConnectWithoutSkillInput | character_skillCreateOrConnectWithoutSkillInput[]
    createMany?: character_skillCreateManySkillInputEnvelope
    connect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
  }

  export type lineage_skillUncheckedCreateNestedManyWithoutSkillInput = {
    create?: XOR<lineage_skillCreateWithoutSkillInput, lineage_skillUncheckedCreateWithoutSkillInput> | lineage_skillCreateWithoutSkillInput[] | lineage_skillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: lineage_skillCreateOrConnectWithoutSkillInput | lineage_skillCreateOrConnectWithoutSkillInput[]
    createMany?: lineage_skillCreateManySkillInputEnvelope
    connect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
  }

  export type character_skillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<character_skillCreateWithoutSkillInput, character_skillUncheckedCreateWithoutSkillInput> | character_skillCreateWithoutSkillInput[] | character_skillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: character_skillCreateOrConnectWithoutSkillInput | character_skillCreateOrConnectWithoutSkillInput[]
    upsert?: character_skillUpsertWithWhereUniqueWithoutSkillInput | character_skillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: character_skillCreateManySkillInputEnvelope
    set?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    disconnect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    delete?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    connect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    update?: character_skillUpdateWithWhereUniqueWithoutSkillInput | character_skillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: character_skillUpdateManyWithWhereWithoutSkillInput | character_skillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: character_skillScalarWhereInput | character_skillScalarWhereInput[]
  }

  export type lineage_skillUpdateManyWithoutSkillNestedInput = {
    create?: XOR<lineage_skillCreateWithoutSkillInput, lineage_skillUncheckedCreateWithoutSkillInput> | lineage_skillCreateWithoutSkillInput[] | lineage_skillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: lineage_skillCreateOrConnectWithoutSkillInput | lineage_skillCreateOrConnectWithoutSkillInput[]
    upsert?: lineage_skillUpsertWithWhereUniqueWithoutSkillInput | lineage_skillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: lineage_skillCreateManySkillInputEnvelope
    set?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    disconnect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    delete?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    connect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    update?: lineage_skillUpdateWithWhereUniqueWithoutSkillInput | lineage_skillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: lineage_skillUpdateManyWithWhereWithoutSkillInput | lineage_skillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: lineage_skillScalarWhereInput | lineage_skillScalarWhereInput[]
  }

  export type character_skillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<character_skillCreateWithoutSkillInput, character_skillUncheckedCreateWithoutSkillInput> | character_skillCreateWithoutSkillInput[] | character_skillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: character_skillCreateOrConnectWithoutSkillInput | character_skillCreateOrConnectWithoutSkillInput[]
    upsert?: character_skillUpsertWithWhereUniqueWithoutSkillInput | character_skillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: character_skillCreateManySkillInputEnvelope
    set?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    disconnect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    delete?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    connect?: character_skillWhereUniqueInput | character_skillWhereUniqueInput[]
    update?: character_skillUpdateWithWhereUniqueWithoutSkillInput | character_skillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: character_skillUpdateManyWithWhereWithoutSkillInput | character_skillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: character_skillScalarWhereInput | character_skillScalarWhereInput[]
  }

  export type lineage_skillUncheckedUpdateManyWithoutSkillNestedInput = {
    create?: XOR<lineage_skillCreateWithoutSkillInput, lineage_skillUncheckedCreateWithoutSkillInput> | lineage_skillCreateWithoutSkillInput[] | lineage_skillUncheckedCreateWithoutSkillInput[]
    connectOrCreate?: lineage_skillCreateOrConnectWithoutSkillInput | lineage_skillCreateOrConnectWithoutSkillInput[]
    upsert?: lineage_skillUpsertWithWhereUniqueWithoutSkillInput | lineage_skillUpsertWithWhereUniqueWithoutSkillInput[]
    createMany?: lineage_skillCreateManySkillInputEnvelope
    set?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    disconnect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    delete?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    connect?: lineage_skillWhereUniqueInput | lineage_skillWhereUniqueInput[]
    update?: lineage_skillUpdateWithWhereUniqueWithoutSkillInput | lineage_skillUpdateWithWhereUniqueWithoutSkillInput[]
    updateMany?: lineage_skillUpdateManyWithWhereWithoutSkillInput | lineage_skillUpdateManyWithWhereWithoutSkillInput[]
    deleteMany?: lineage_skillScalarWhereInput | lineage_skillScalarWhereInput[]
  }

  export type characterCreateNestedOneWithoutSkillsInput = {
    create?: XOR<characterCreateWithoutSkillsInput, characterUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: characterCreateOrConnectWithoutSkillsInput
    connect?: characterWhereUniqueInput
  }

  export type skillCreateNestedOneWithoutCharactersInput = {
    create?: XOR<skillCreateWithoutCharactersInput, skillUncheckedCreateWithoutCharactersInput>
    connectOrCreate?: skillCreateOrConnectWithoutCharactersInput
    connect?: skillWhereUniqueInput
  }

  export type characterUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<characterCreateWithoutSkillsInput, characterUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: characterCreateOrConnectWithoutSkillsInput
    upsert?: characterUpsertWithoutSkillsInput
    connect?: characterWhereUniqueInput
    update?: XOR<XOR<characterUpdateToOneWithWhereWithoutSkillsInput, characterUpdateWithoutSkillsInput>, characterUncheckedUpdateWithoutSkillsInput>
  }

  export type skillUpdateOneRequiredWithoutCharactersNestedInput = {
    create?: XOR<skillCreateWithoutCharactersInput, skillUncheckedCreateWithoutCharactersInput>
    connectOrCreate?: skillCreateOrConnectWithoutCharactersInput
    upsert?: skillUpsertWithoutCharactersInput
    connect?: skillWhereUniqueInput
    update?: XOR<XOR<skillUpdateToOneWithWhereWithoutCharactersInput, skillUpdateWithoutCharactersInput>, skillUncheckedUpdateWithoutCharactersInput>
  }

  export type lineageCreateNestedOneWithoutSkillsInput = {
    create?: XOR<lineageCreateWithoutSkillsInput, lineageUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: lineageCreateOrConnectWithoutSkillsInput
    connect?: lineageWhereUniqueInput
  }

  export type skillCreateNestedOneWithoutLineagesInput = {
    create?: XOR<skillCreateWithoutLineagesInput, skillUncheckedCreateWithoutLineagesInput>
    connectOrCreate?: skillCreateOrConnectWithoutLineagesInput
    connect?: skillWhereUniqueInput
  }

  export type lineageUpdateOneRequiredWithoutSkillsNestedInput = {
    create?: XOR<lineageCreateWithoutSkillsInput, lineageUncheckedCreateWithoutSkillsInput>
    connectOrCreate?: lineageCreateOrConnectWithoutSkillsInput
    upsert?: lineageUpsertWithoutSkillsInput
    connect?: lineageWhereUniqueInput
    update?: XOR<XOR<lineageUpdateToOneWithWhereWithoutSkillsInput, lineageUpdateWithoutSkillsInput>, lineageUncheckedUpdateWithoutSkillsInput>
  }

  export type skillUpdateOneRequiredWithoutLineagesNestedInput = {
    create?: XOR<skillCreateWithoutLineagesInput, skillUncheckedCreateWithoutLineagesInput>
    connectOrCreate?: skillCreateOrConnectWithoutLineagesInput
    upsert?: skillUpsertWithoutLineagesInput
    connect?: skillWhereUniqueInput
    update?: XOR<XOR<skillUpdateToOneWithWhereWithoutLineagesInput, skillUpdateWithoutLineagesInput>, skillUncheckedUpdateWithoutLineagesInput>
  }

  export type characterCreateNestedManyWithoutUserInput = {
    create?: XOR<characterCreateWithoutUserInput, characterUncheckedCreateWithoutUserInput> | characterCreateWithoutUserInput[] | characterUncheckedCreateWithoutUserInput[]
    connectOrCreate?: characterCreateOrConnectWithoutUserInput | characterCreateOrConnectWithoutUserInput[]
    createMany?: characterCreateManyUserInputEnvelope
    connect?: characterWhereUniqueInput | characterWhereUniqueInput[]
  }

  export type characterUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<characterCreateWithoutUserInput, characterUncheckedCreateWithoutUserInput> | characterCreateWithoutUserInput[] | characterUncheckedCreateWithoutUserInput[]
    connectOrCreate?: characterCreateOrConnectWithoutUserInput | characterCreateOrConnectWithoutUserInput[]
    createMany?: characterCreateManyUserInputEnvelope
    connect?: characterWhereUniqueInput | characterWhereUniqueInput[]
  }

  export type characterUpdateManyWithoutUserNestedInput = {
    create?: XOR<characterCreateWithoutUserInput, characterUncheckedCreateWithoutUserInput> | characterCreateWithoutUserInput[] | characterUncheckedCreateWithoutUserInput[]
    connectOrCreate?: characterCreateOrConnectWithoutUserInput | characterCreateOrConnectWithoutUserInput[]
    upsert?: characterUpsertWithWhereUniqueWithoutUserInput | characterUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: characterCreateManyUserInputEnvelope
    set?: characterWhereUniqueInput | characterWhereUniqueInput[]
    disconnect?: characterWhereUniqueInput | characterWhereUniqueInput[]
    delete?: characterWhereUniqueInput | characterWhereUniqueInput[]
    connect?: characterWhereUniqueInput | characterWhereUniqueInput[]
    update?: characterUpdateWithWhereUniqueWithoutUserInput | characterUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: characterUpdateManyWithWhereWithoutUserInput | characterUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: characterScalarWhereInput | characterScalarWhereInput[]
  }

  export type characterUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<characterCreateWithoutUserInput, characterUncheckedCreateWithoutUserInput> | characterCreateWithoutUserInput[] | characterUncheckedCreateWithoutUserInput[]
    connectOrCreate?: characterCreateOrConnectWithoutUserInput | characterCreateOrConnectWithoutUserInput[]
    upsert?: characterUpsertWithWhereUniqueWithoutUserInput | characterUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: characterCreateManyUserInputEnvelope
    set?: characterWhereUniqueInput | characterWhereUniqueInput[]
    disconnect?: characterWhereUniqueInput | characterWhereUniqueInput[]
    delete?: characterWhereUniqueInput | characterWhereUniqueInput[]
    connect?: characterWhereUniqueInput | characterWhereUniqueInput[]
    update?: characterUpdateWithWhereUniqueWithoutUserInput | characterUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: characterUpdateManyWithWhereWithoutUserInput | characterUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: characterScalarWhereInput | characterScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type userCreateWithoutCharactersInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    password: string
  }

  export type userUncheckedCreateWithoutCharactersInput = {
    id?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    email: string
    username: string
    password: string
  }

  export type userCreateOrConnectWithoutCharactersInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutCharactersInput, userUncheckedCreateWithoutCharactersInput>
  }

  export type character_skillCreateWithoutCharacterInput = {
    skill: skillCreateNestedOneWithoutCharactersInput
  }

  export type character_skillUncheckedCreateWithoutCharacterInput = {
    id?: number
    skillId: number
  }

  export type character_skillCreateOrConnectWithoutCharacterInput = {
    where: character_skillWhereUniqueInput
    create: XOR<character_skillCreateWithoutCharacterInput, character_skillUncheckedCreateWithoutCharacterInput>
  }

  export type character_skillCreateManyCharacterInputEnvelope = {
    data: character_skillCreateManyCharacterInput | character_skillCreateManyCharacterInput[]
    skipDuplicates?: boolean
  }

  export type character_lineageCreateWithoutCharacterInput = {
    pure?: boolean
    lineage: lineageCreateNestedOneWithoutCharactersInput
  }

  export type character_lineageUncheckedCreateWithoutCharacterInput = {
    id?: number
    lineageId: number
    pure?: boolean
  }

  export type character_lineageCreateOrConnectWithoutCharacterInput = {
    where: character_lineageWhereUniqueInput
    create: XOR<character_lineageCreateWithoutCharacterInput, character_lineageUncheckedCreateWithoutCharacterInput>
  }

  export type character_lineageCreateManyCharacterInputEnvelope = {
    data: character_lineageCreateManyCharacterInput | character_lineageCreateManyCharacterInput[]
    skipDuplicates?: boolean
  }

  export type charStatsCreateWithoutCharacterInput = {
    createdAt?: Date | string
    vitality: number
    vigor: number
    power: number
    speed: number
    defense: number
    initiative: number
    size: number
    baseWeight: number
    carryCap: number
    liftCap: number
  }

  export type charStatsUncheckedCreateWithoutCharacterInput = {
    id?: number
    createdAt?: Date | string
    vitality: number
    vigor: number
    power: number
    speed: number
    defense: number
    initiative: number
    size: number
    baseWeight: number
    carryCap: number
    liftCap: number
  }

  export type charStatsCreateOrConnectWithoutCharacterInput = {
    where: charStatsWhereUniqueInput
    create: XOR<charStatsCreateWithoutCharacterInput, charStatsUncheckedCreateWithoutCharacterInput>
  }

  export type userUpsertWithoutCharactersInput = {
    update: XOR<userUpdateWithoutCharactersInput, userUncheckedUpdateWithoutCharactersInput>
    create: XOR<userCreateWithoutCharactersInput, userUncheckedCreateWithoutCharactersInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutCharactersInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutCharactersInput, userUncheckedUpdateWithoutCharactersInput>
  }

  export type userUpdateWithoutCharactersInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateWithoutCharactersInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type character_skillUpsertWithWhereUniqueWithoutCharacterInput = {
    where: character_skillWhereUniqueInput
    update: XOR<character_skillUpdateWithoutCharacterInput, character_skillUncheckedUpdateWithoutCharacterInput>
    create: XOR<character_skillCreateWithoutCharacterInput, character_skillUncheckedCreateWithoutCharacterInput>
  }

  export type character_skillUpdateWithWhereUniqueWithoutCharacterInput = {
    where: character_skillWhereUniqueInput
    data: XOR<character_skillUpdateWithoutCharacterInput, character_skillUncheckedUpdateWithoutCharacterInput>
  }

  export type character_skillUpdateManyWithWhereWithoutCharacterInput = {
    where: character_skillScalarWhereInput
    data: XOR<character_skillUpdateManyMutationInput, character_skillUncheckedUpdateManyWithoutCharacterInput>
  }

  export type character_skillScalarWhereInput = {
    AND?: character_skillScalarWhereInput | character_skillScalarWhereInput[]
    OR?: character_skillScalarWhereInput[]
    NOT?: character_skillScalarWhereInput | character_skillScalarWhereInput[]
    id?: IntFilter<"character_skill"> | number
    characterId?: IntFilter<"character_skill"> | number
    skillId?: IntFilter<"character_skill"> | number
  }

  export type character_lineageUpsertWithWhereUniqueWithoutCharacterInput = {
    where: character_lineageWhereUniqueInput
    update: XOR<character_lineageUpdateWithoutCharacterInput, character_lineageUncheckedUpdateWithoutCharacterInput>
    create: XOR<character_lineageCreateWithoutCharacterInput, character_lineageUncheckedCreateWithoutCharacterInput>
  }

  export type character_lineageUpdateWithWhereUniqueWithoutCharacterInput = {
    where: character_lineageWhereUniqueInput
    data: XOR<character_lineageUpdateWithoutCharacterInput, character_lineageUncheckedUpdateWithoutCharacterInput>
  }

  export type character_lineageUpdateManyWithWhereWithoutCharacterInput = {
    where: character_lineageScalarWhereInput
    data: XOR<character_lineageUpdateManyMutationInput, character_lineageUncheckedUpdateManyWithoutCharacterInput>
  }

  export type character_lineageScalarWhereInput = {
    AND?: character_lineageScalarWhereInput | character_lineageScalarWhereInput[]
    OR?: character_lineageScalarWhereInput[]
    NOT?: character_lineageScalarWhereInput | character_lineageScalarWhereInput[]
    id?: IntFilter<"character_lineage"> | number
    characterId?: IntFilter<"character_lineage"> | number
    lineageId?: IntFilter<"character_lineage"> | number
    pure?: BoolFilter<"character_lineage"> | boolean
  }

  export type charStatsUpsertWithoutCharacterInput = {
    update: XOR<charStatsUpdateWithoutCharacterInput, charStatsUncheckedUpdateWithoutCharacterInput>
    create: XOR<charStatsCreateWithoutCharacterInput, charStatsUncheckedCreateWithoutCharacterInput>
    where?: charStatsWhereInput
  }

  export type charStatsUpdateToOneWithWhereWithoutCharacterInput = {
    where?: charStatsWhereInput
    data: XOR<charStatsUpdateWithoutCharacterInput, charStatsUncheckedUpdateWithoutCharacterInput>
  }

  export type charStatsUpdateWithoutCharacterInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vitality?: IntFieldUpdateOperationsInput | number
    vigor?: IntFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    speed?: IntFieldUpdateOperationsInput | number
    defense?: IntFieldUpdateOperationsInput | number
    initiative?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    baseWeight?: IntFieldUpdateOperationsInput | number
    carryCap?: IntFieldUpdateOperationsInput | number
    liftCap?: IntFieldUpdateOperationsInput | number
  }

  export type charStatsUncheckedUpdateWithoutCharacterInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vitality?: IntFieldUpdateOperationsInput | number
    vigor?: IntFieldUpdateOperationsInput | number
    power?: IntFieldUpdateOperationsInput | number
    speed?: IntFieldUpdateOperationsInput | number
    defense?: IntFieldUpdateOperationsInput | number
    initiative?: IntFieldUpdateOperationsInput | number
    size?: IntFieldUpdateOperationsInput | number
    baseWeight?: IntFieldUpdateOperationsInput | number
    carryCap?: IntFieldUpdateOperationsInput | number
    liftCap?: IntFieldUpdateOperationsInput | number
  }

  export type characterCreateWithoutStatsInput = {
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    user: userCreateNestedOneWithoutCharactersInput
    skills?: character_skillCreateNestedManyWithoutCharacterInput
    lineages?: character_lineageCreateNestedManyWithoutCharacterInput
  }

  export type characterUncheckedCreateWithoutStatsInput = {
    id?: number
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    authorId: number
    skills?: character_skillUncheckedCreateNestedManyWithoutCharacterInput
    lineages?: character_lineageUncheckedCreateNestedManyWithoutCharacterInput
  }

  export type characterCreateOrConnectWithoutStatsInput = {
    where: characterWhereUniqueInput
    create: XOR<characterCreateWithoutStatsInput, characterUncheckedCreateWithoutStatsInput>
  }

  export type characterUpsertWithoutStatsInput = {
    update: XOR<characterUpdateWithoutStatsInput, characterUncheckedUpdateWithoutStatsInput>
    create: XOR<characterCreateWithoutStatsInput, characterUncheckedCreateWithoutStatsInput>
    where?: characterWhereInput
  }

  export type characterUpdateToOneWithWhereWithoutStatsInput = {
    where?: characterWhereInput
    data: XOR<characterUpdateWithoutStatsInput, characterUncheckedUpdateWithoutStatsInput>
  }

  export type characterUpdateWithoutStatsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    user?: userUpdateOneRequiredWithoutCharactersNestedInput
    skills?: character_skillUpdateManyWithoutCharacterNestedInput
    lineages?: character_lineageUpdateManyWithoutCharacterNestedInput
  }

  export type characterUncheckedUpdateWithoutStatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    skills?: character_skillUncheckedUpdateManyWithoutCharacterNestedInput
    lineages?: character_lineageUncheckedUpdateManyWithoutCharacterNestedInput
  }

  export type character_lineageCreateWithoutLineageInput = {
    pure?: boolean
    character: characterCreateNestedOneWithoutLineagesInput
  }

  export type character_lineageUncheckedCreateWithoutLineageInput = {
    id?: number
    characterId: number
    pure?: boolean
  }

  export type character_lineageCreateOrConnectWithoutLineageInput = {
    where: character_lineageWhereUniqueInput
    create: XOR<character_lineageCreateWithoutLineageInput, character_lineageUncheckedCreateWithoutLineageInput>
  }

  export type character_lineageCreateManyLineageInputEnvelope = {
    data: character_lineageCreateManyLineageInput | character_lineageCreateManyLineageInput[]
    skipDuplicates?: boolean
  }

  export type lineage_skillCreateWithoutLineageInput = {
    pureSkill: boolean
    skill: skillCreateNestedOneWithoutLineagesInput
  }

  export type lineage_skillUncheckedCreateWithoutLineageInput = {
    id?: number
    skillId: number
    pureSkill: boolean
  }

  export type lineage_skillCreateOrConnectWithoutLineageInput = {
    where: lineage_skillWhereUniqueInput
    create: XOR<lineage_skillCreateWithoutLineageInput, lineage_skillUncheckedCreateWithoutLineageInput>
  }

  export type lineage_skillCreateManyLineageInputEnvelope = {
    data: lineage_skillCreateManyLineageInput | lineage_skillCreateManyLineageInput[]
    skipDuplicates?: boolean
  }

  export type character_lineageUpsertWithWhereUniqueWithoutLineageInput = {
    where: character_lineageWhereUniqueInput
    update: XOR<character_lineageUpdateWithoutLineageInput, character_lineageUncheckedUpdateWithoutLineageInput>
    create: XOR<character_lineageCreateWithoutLineageInput, character_lineageUncheckedCreateWithoutLineageInput>
  }

  export type character_lineageUpdateWithWhereUniqueWithoutLineageInput = {
    where: character_lineageWhereUniqueInput
    data: XOR<character_lineageUpdateWithoutLineageInput, character_lineageUncheckedUpdateWithoutLineageInput>
  }

  export type character_lineageUpdateManyWithWhereWithoutLineageInput = {
    where: character_lineageScalarWhereInput
    data: XOR<character_lineageUpdateManyMutationInput, character_lineageUncheckedUpdateManyWithoutLineageInput>
  }

  export type lineage_skillUpsertWithWhereUniqueWithoutLineageInput = {
    where: lineage_skillWhereUniqueInput
    update: XOR<lineage_skillUpdateWithoutLineageInput, lineage_skillUncheckedUpdateWithoutLineageInput>
    create: XOR<lineage_skillCreateWithoutLineageInput, lineage_skillUncheckedCreateWithoutLineageInput>
  }

  export type lineage_skillUpdateWithWhereUniqueWithoutLineageInput = {
    where: lineage_skillWhereUniqueInput
    data: XOR<lineage_skillUpdateWithoutLineageInput, lineage_skillUncheckedUpdateWithoutLineageInput>
  }

  export type lineage_skillUpdateManyWithWhereWithoutLineageInput = {
    where: lineage_skillScalarWhereInput
    data: XOR<lineage_skillUpdateManyMutationInput, lineage_skillUncheckedUpdateManyWithoutLineageInput>
  }

  export type lineage_skillScalarWhereInput = {
    AND?: lineage_skillScalarWhereInput | lineage_skillScalarWhereInput[]
    OR?: lineage_skillScalarWhereInput[]
    NOT?: lineage_skillScalarWhereInput | lineage_skillScalarWhereInput[]
    id?: IntFilter<"lineage_skill"> | number
    lineageId?: IntFilter<"lineage_skill"> | number
    skillId?: IntFilter<"lineage_skill"> | number
    pureSkill?: BoolFilter<"lineage_skill"> | boolean
  }

  export type characterCreateWithoutLineagesInput = {
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    user: userCreateNestedOneWithoutCharactersInput
    skills?: character_skillCreateNestedManyWithoutCharacterInput
    stats?: charStatsCreateNestedOneWithoutCharacterInput
  }

  export type characterUncheckedCreateWithoutLineagesInput = {
    id?: number
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    authorId: number
    skills?: character_skillUncheckedCreateNestedManyWithoutCharacterInput
    stats?: charStatsUncheckedCreateNestedOneWithoutCharacterInput
  }

  export type characterCreateOrConnectWithoutLineagesInput = {
    where: characterWhereUniqueInput
    create: XOR<characterCreateWithoutLineagesInput, characterUncheckedCreateWithoutLineagesInput>
  }

  export type lineageCreateWithoutCharactersInput = {
    name?: string | null
    description: string
    skills?: lineage_skillCreateNestedManyWithoutLineageInput
  }

  export type lineageUncheckedCreateWithoutCharactersInput = {
    id?: number
    name?: string | null
    description: string
    skills?: lineage_skillUncheckedCreateNestedManyWithoutLineageInput
  }

  export type lineageCreateOrConnectWithoutCharactersInput = {
    where: lineageWhereUniqueInput
    create: XOR<lineageCreateWithoutCharactersInput, lineageUncheckedCreateWithoutCharactersInput>
  }

  export type characterUpsertWithoutLineagesInput = {
    update: XOR<characterUpdateWithoutLineagesInput, characterUncheckedUpdateWithoutLineagesInput>
    create: XOR<characterCreateWithoutLineagesInput, characterUncheckedCreateWithoutLineagesInput>
    where?: characterWhereInput
  }

  export type characterUpdateToOneWithWhereWithoutLineagesInput = {
    where?: characterWhereInput
    data: XOR<characterUpdateWithoutLineagesInput, characterUncheckedUpdateWithoutLineagesInput>
  }

  export type characterUpdateWithoutLineagesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    user?: userUpdateOneRequiredWithoutCharactersNestedInput
    skills?: character_skillUpdateManyWithoutCharacterNestedInput
    stats?: charStatsUpdateOneWithoutCharacterNestedInput
  }

  export type characterUncheckedUpdateWithoutLineagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    skills?: character_skillUncheckedUpdateManyWithoutCharacterNestedInput
    stats?: charStatsUncheckedUpdateOneWithoutCharacterNestedInput
  }

  export type lineageUpsertWithoutCharactersInput = {
    update: XOR<lineageUpdateWithoutCharactersInput, lineageUncheckedUpdateWithoutCharactersInput>
    create: XOR<lineageCreateWithoutCharactersInput, lineageUncheckedCreateWithoutCharactersInput>
    where?: lineageWhereInput
  }

  export type lineageUpdateToOneWithWhereWithoutCharactersInput = {
    where?: lineageWhereInput
    data: XOR<lineageUpdateWithoutCharactersInput, lineageUncheckedUpdateWithoutCharactersInput>
  }

  export type lineageUpdateWithoutCharactersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    skills?: lineage_skillUpdateManyWithoutLineageNestedInput
  }

  export type lineageUncheckedUpdateWithoutCharactersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    skills?: lineage_skillUncheckedUpdateManyWithoutLineageNestedInput
  }

  export type character_skillCreateWithoutSkillInput = {
    character: characterCreateNestedOneWithoutSkillsInput
  }

  export type character_skillUncheckedCreateWithoutSkillInput = {
    id?: number
    characterId: number
  }

  export type character_skillCreateOrConnectWithoutSkillInput = {
    where: character_skillWhereUniqueInput
    create: XOR<character_skillCreateWithoutSkillInput, character_skillUncheckedCreateWithoutSkillInput>
  }

  export type character_skillCreateManySkillInputEnvelope = {
    data: character_skillCreateManySkillInput | character_skillCreateManySkillInput[]
    skipDuplicates?: boolean
  }

  export type lineage_skillCreateWithoutSkillInput = {
    pureSkill: boolean
    lineage: lineageCreateNestedOneWithoutSkillsInput
  }

  export type lineage_skillUncheckedCreateWithoutSkillInput = {
    id?: number
    lineageId: number
    pureSkill: boolean
  }

  export type lineage_skillCreateOrConnectWithoutSkillInput = {
    where: lineage_skillWhereUniqueInput
    create: XOR<lineage_skillCreateWithoutSkillInput, lineage_skillUncheckedCreateWithoutSkillInput>
  }

  export type lineage_skillCreateManySkillInputEnvelope = {
    data: lineage_skillCreateManySkillInput | lineage_skillCreateManySkillInput[]
    skipDuplicates?: boolean
  }

  export type character_skillUpsertWithWhereUniqueWithoutSkillInput = {
    where: character_skillWhereUniqueInput
    update: XOR<character_skillUpdateWithoutSkillInput, character_skillUncheckedUpdateWithoutSkillInput>
    create: XOR<character_skillCreateWithoutSkillInput, character_skillUncheckedCreateWithoutSkillInput>
  }

  export type character_skillUpdateWithWhereUniqueWithoutSkillInput = {
    where: character_skillWhereUniqueInput
    data: XOR<character_skillUpdateWithoutSkillInput, character_skillUncheckedUpdateWithoutSkillInput>
  }

  export type character_skillUpdateManyWithWhereWithoutSkillInput = {
    where: character_skillScalarWhereInput
    data: XOR<character_skillUpdateManyMutationInput, character_skillUncheckedUpdateManyWithoutSkillInput>
  }

  export type lineage_skillUpsertWithWhereUniqueWithoutSkillInput = {
    where: lineage_skillWhereUniqueInput
    update: XOR<lineage_skillUpdateWithoutSkillInput, lineage_skillUncheckedUpdateWithoutSkillInput>
    create: XOR<lineage_skillCreateWithoutSkillInput, lineage_skillUncheckedCreateWithoutSkillInput>
  }

  export type lineage_skillUpdateWithWhereUniqueWithoutSkillInput = {
    where: lineage_skillWhereUniqueInput
    data: XOR<lineage_skillUpdateWithoutSkillInput, lineage_skillUncheckedUpdateWithoutSkillInput>
  }

  export type lineage_skillUpdateManyWithWhereWithoutSkillInput = {
    where: lineage_skillScalarWhereInput
    data: XOR<lineage_skillUpdateManyMutationInput, lineage_skillUncheckedUpdateManyWithoutSkillInput>
  }

  export type characterCreateWithoutSkillsInput = {
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    user: userCreateNestedOneWithoutCharactersInput
    lineages?: character_lineageCreateNestedManyWithoutCharacterInput
    stats?: charStatsCreateNestedOneWithoutCharacterInput
  }

  export type characterUncheckedCreateWithoutSkillsInput = {
    id?: number
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    authorId: number
    lineages?: character_lineageUncheckedCreateNestedManyWithoutCharacterInput
    stats?: charStatsUncheckedCreateNestedOneWithoutCharacterInput
  }

  export type characterCreateOrConnectWithoutSkillsInput = {
    where: characterWhereUniqueInput
    create: XOR<characterCreateWithoutSkillsInput, characterUncheckedCreateWithoutSkillsInput>
  }

  export type skillCreateWithoutCharactersInput = {
    name?: string | null
    description?: string | null
    lineages?: lineage_skillCreateNestedManyWithoutSkillInput
  }

  export type skillUncheckedCreateWithoutCharactersInput = {
    id?: number
    name?: string | null
    description?: string | null
    lineages?: lineage_skillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type skillCreateOrConnectWithoutCharactersInput = {
    where: skillWhereUniqueInput
    create: XOR<skillCreateWithoutCharactersInput, skillUncheckedCreateWithoutCharactersInput>
  }

  export type characterUpsertWithoutSkillsInput = {
    update: XOR<characterUpdateWithoutSkillsInput, characterUncheckedUpdateWithoutSkillsInput>
    create: XOR<characterCreateWithoutSkillsInput, characterUncheckedCreateWithoutSkillsInput>
    where?: characterWhereInput
  }

  export type characterUpdateToOneWithWhereWithoutSkillsInput = {
    where?: characterWhereInput
    data: XOR<characterUpdateWithoutSkillsInput, characterUncheckedUpdateWithoutSkillsInput>
  }

  export type characterUpdateWithoutSkillsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    user?: userUpdateOneRequiredWithoutCharactersNestedInput
    lineages?: character_lineageUpdateManyWithoutCharacterNestedInput
    stats?: charStatsUpdateOneWithoutCharacterNestedInput
  }

  export type characterUncheckedUpdateWithoutSkillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    authorId?: IntFieldUpdateOperationsInput | number
    lineages?: character_lineageUncheckedUpdateManyWithoutCharacterNestedInput
    stats?: charStatsUncheckedUpdateOneWithoutCharacterNestedInput
  }

  export type skillUpsertWithoutCharactersInput = {
    update: XOR<skillUpdateWithoutCharactersInput, skillUncheckedUpdateWithoutCharactersInput>
    create: XOR<skillCreateWithoutCharactersInput, skillUncheckedCreateWithoutCharactersInput>
    where?: skillWhereInput
  }

  export type skillUpdateToOneWithWhereWithoutCharactersInput = {
    where?: skillWhereInput
    data: XOR<skillUpdateWithoutCharactersInput, skillUncheckedUpdateWithoutCharactersInput>
  }

  export type skillUpdateWithoutCharactersInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lineages?: lineage_skillUpdateManyWithoutSkillNestedInput
  }

  export type skillUncheckedUpdateWithoutCharactersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    lineages?: lineage_skillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type lineageCreateWithoutSkillsInput = {
    name?: string | null
    description: string
    characters?: character_lineageCreateNestedManyWithoutLineageInput
  }

  export type lineageUncheckedCreateWithoutSkillsInput = {
    id?: number
    name?: string | null
    description: string
    characters?: character_lineageUncheckedCreateNestedManyWithoutLineageInput
  }

  export type lineageCreateOrConnectWithoutSkillsInput = {
    where: lineageWhereUniqueInput
    create: XOR<lineageCreateWithoutSkillsInput, lineageUncheckedCreateWithoutSkillsInput>
  }

  export type skillCreateWithoutLineagesInput = {
    name?: string | null
    description?: string | null
    characters?: character_skillCreateNestedManyWithoutSkillInput
  }

  export type skillUncheckedCreateWithoutLineagesInput = {
    id?: number
    name?: string | null
    description?: string | null
    characters?: character_skillUncheckedCreateNestedManyWithoutSkillInput
  }

  export type skillCreateOrConnectWithoutLineagesInput = {
    where: skillWhereUniqueInput
    create: XOR<skillCreateWithoutLineagesInput, skillUncheckedCreateWithoutLineagesInput>
  }

  export type lineageUpsertWithoutSkillsInput = {
    update: XOR<lineageUpdateWithoutSkillsInput, lineageUncheckedUpdateWithoutSkillsInput>
    create: XOR<lineageCreateWithoutSkillsInput, lineageUncheckedCreateWithoutSkillsInput>
    where?: lineageWhereInput
  }

  export type lineageUpdateToOneWithWhereWithoutSkillsInput = {
    where?: lineageWhereInput
    data: XOR<lineageUpdateWithoutSkillsInput, lineageUncheckedUpdateWithoutSkillsInput>
  }

  export type lineageUpdateWithoutSkillsInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    characters?: character_lineageUpdateManyWithoutLineageNestedInput
  }

  export type lineageUncheckedUpdateWithoutSkillsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    characters?: character_lineageUncheckedUpdateManyWithoutLineageNestedInput
  }

  export type skillUpsertWithoutLineagesInput = {
    update: XOR<skillUpdateWithoutLineagesInput, skillUncheckedUpdateWithoutLineagesInput>
    create: XOR<skillCreateWithoutLineagesInput, skillUncheckedCreateWithoutLineagesInput>
    where?: skillWhereInput
  }

  export type skillUpdateToOneWithWhereWithoutLineagesInput = {
    where?: skillWhereInput
    data: XOR<skillUpdateWithoutLineagesInput, skillUncheckedUpdateWithoutLineagesInput>
  }

  export type skillUpdateWithoutLineagesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    characters?: character_skillUpdateManyWithoutSkillNestedInput
  }

  export type skillUncheckedUpdateWithoutLineagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    characters?: character_skillUncheckedUpdateManyWithoutSkillNestedInput
  }

  export type characterCreateWithoutUserInput = {
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    skills?: character_skillCreateNestedManyWithoutCharacterInput
    lineages?: character_lineageCreateNestedManyWithoutCharacterInput
    stats?: charStatsCreateNestedOneWithoutCharacterInput
  }

  export type characterUncheckedCreateWithoutUserInput = {
    id?: number
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
    skills?: character_skillUncheckedCreateNestedManyWithoutCharacterInput
    lineages?: character_lineageUncheckedCreateNestedManyWithoutCharacterInput
    stats?: charStatsUncheckedCreateNestedOneWithoutCharacterInput
  }

  export type characterCreateOrConnectWithoutUserInput = {
    where: characterWhereUniqueInput
    create: XOR<characterCreateWithoutUserInput, characterUncheckedCreateWithoutUserInput>
  }

  export type characterCreateManyUserInputEnvelope = {
    data: characterCreateManyUserInput | characterCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type characterUpsertWithWhereUniqueWithoutUserInput = {
    where: characterWhereUniqueInput
    update: XOR<characterUpdateWithoutUserInput, characterUncheckedUpdateWithoutUserInput>
    create: XOR<characterCreateWithoutUserInput, characterUncheckedCreateWithoutUserInput>
  }

  export type characterUpdateWithWhereUniqueWithoutUserInput = {
    where: characterWhereUniqueInput
    data: XOR<characterUpdateWithoutUserInput, characterUncheckedUpdateWithoutUserInput>
  }

  export type characterUpdateManyWithWhereWithoutUserInput = {
    where: characterScalarWhereInput
    data: XOR<characterUpdateManyMutationInput, characterUncheckedUpdateManyWithoutUserInput>
  }

  export type characterScalarWhereInput = {
    AND?: characterScalarWhereInput | characterScalarWhereInput[]
    OR?: characterScalarWhereInput[]
    NOT?: characterScalarWhereInput | characterScalarWhereInput[]
    id?: IntFilter<"character"> | number
    createdAt?: DateTimeFilter<"character"> | Date | string
    name?: StringFilter<"character"> | string
    level?: IntFilter<"character"> | number
    experience?: IntFilter<"character"> | number
    tier?: IntFilter<"character"> | number
    agility?: IntFilter<"character"> | number
    body?: IntFilter<"character"> | number
    mind?: IntFilter<"character"> | number
    public?: BoolFilter<"character"> | boolean
    authorId?: IntFilter<"character"> | number
  }

  export type character_skillCreateManyCharacterInput = {
    id?: number
    skillId: number
  }

  export type character_lineageCreateManyCharacterInput = {
    id?: number
    lineageId: number
    pure?: boolean
  }

  export type character_skillUpdateWithoutCharacterInput = {
    skill?: skillUpdateOneRequiredWithoutCharactersNestedInput
  }

  export type character_skillUncheckedUpdateWithoutCharacterInput = {
    id?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type character_skillUncheckedUpdateManyWithoutCharacterInput = {
    id?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
  }

  export type character_lineageUpdateWithoutCharacterInput = {
    pure?: BoolFieldUpdateOperationsInput | boolean
    lineage?: lineageUpdateOneRequiredWithoutCharactersNestedInput
  }

  export type character_lineageUncheckedUpdateWithoutCharacterInput = {
    id?: IntFieldUpdateOperationsInput | number
    lineageId?: IntFieldUpdateOperationsInput | number
    pure?: BoolFieldUpdateOperationsInput | boolean
  }

  export type character_lineageUncheckedUpdateManyWithoutCharacterInput = {
    id?: IntFieldUpdateOperationsInput | number
    lineageId?: IntFieldUpdateOperationsInput | number
    pure?: BoolFieldUpdateOperationsInput | boolean
  }

  export type character_lineageCreateManyLineageInput = {
    id?: number
    characterId: number
    pure?: boolean
  }

  export type lineage_skillCreateManyLineageInput = {
    id?: number
    skillId: number
    pureSkill: boolean
  }

  export type character_lineageUpdateWithoutLineageInput = {
    pure?: BoolFieldUpdateOperationsInput | boolean
    character?: characterUpdateOneRequiredWithoutLineagesNestedInput
  }

  export type character_lineageUncheckedUpdateWithoutLineageInput = {
    id?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
    pure?: BoolFieldUpdateOperationsInput | boolean
  }

  export type character_lineageUncheckedUpdateManyWithoutLineageInput = {
    id?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
    pure?: BoolFieldUpdateOperationsInput | boolean
  }

  export type lineage_skillUpdateWithoutLineageInput = {
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
    skill?: skillUpdateOneRequiredWithoutLineagesNestedInput
  }

  export type lineage_skillUncheckedUpdateWithoutLineageInput = {
    id?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
  }

  export type lineage_skillUncheckedUpdateManyWithoutLineageInput = {
    id?: IntFieldUpdateOperationsInput | number
    skillId?: IntFieldUpdateOperationsInput | number
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
  }

  export type character_skillCreateManySkillInput = {
    id?: number
    characterId: number
  }

  export type lineage_skillCreateManySkillInput = {
    id?: number
    lineageId: number
    pureSkill: boolean
  }

  export type character_skillUpdateWithoutSkillInput = {
    character?: characterUpdateOneRequiredWithoutSkillsNestedInput
  }

  export type character_skillUncheckedUpdateWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
  }

  export type character_skillUncheckedUpdateManyWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    characterId?: IntFieldUpdateOperationsInput | number
  }

  export type lineage_skillUpdateWithoutSkillInput = {
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
    lineage?: lineageUpdateOneRequiredWithoutSkillsNestedInput
  }

  export type lineage_skillUncheckedUpdateWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    lineageId?: IntFieldUpdateOperationsInput | number
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
  }

  export type lineage_skillUncheckedUpdateManyWithoutSkillInput = {
    id?: IntFieldUpdateOperationsInput | number
    lineageId?: IntFieldUpdateOperationsInput | number
    pureSkill?: BoolFieldUpdateOperationsInput | boolean
  }

  export type characterCreateManyUserInput = {
    id?: number
    createdAt?: Date | string
    name: string
    level: number
    experience?: number
    tier: number
    agility: number
    body: number
    mind: number
    public?: boolean
  }

  export type characterUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    skills?: character_skillUpdateManyWithoutCharacterNestedInput
    lineages?: character_lineageUpdateManyWithoutCharacterNestedInput
    stats?: charStatsUpdateOneWithoutCharacterNestedInput
  }

  export type characterUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
    skills?: character_skillUncheckedUpdateManyWithoutCharacterNestedInput
    lineages?: character_lineageUncheckedUpdateManyWithoutCharacterNestedInput
    stats?: charStatsUncheckedUpdateOneWithoutCharacterNestedInput
  }

  export type characterUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    experience?: IntFieldUpdateOperationsInput | number
    tier?: IntFieldUpdateOperationsInput | number
    agility?: IntFieldUpdateOperationsInput | number
    body?: IntFieldUpdateOperationsInput | number
    mind?: IntFieldUpdateOperationsInput | number
    public?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CharacterCountOutputTypeDefaultArgs instead
     */
    export type CharacterCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CharacterCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LineageCountOutputTypeDefaultArgs instead
     */
    export type LineageCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LineageCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SkillCountOutputTypeDefaultArgs instead
     */
    export type SkillCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SkillCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use characterDefaultArgs instead
     */
    export type characterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = characterDefaultArgs<ExtArgs>
    /**
     * @deprecated Use charStatsDefaultArgs instead
     */
    export type charStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = charStatsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use lineageDefaultArgs instead
     */
    export type lineageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = lineageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use character_lineageDefaultArgs instead
     */
    export type character_lineageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = character_lineageDefaultArgs<ExtArgs>
    /**
     * @deprecated Use skillDefaultArgs instead
     */
    export type skillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = skillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use character_skillDefaultArgs instead
     */
    export type character_skillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = character_skillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use lineage_skillDefaultArgs instead
     */
    export type lineage_skillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = lineage_skillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use userDefaultArgs instead
     */
    export type userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = userDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}