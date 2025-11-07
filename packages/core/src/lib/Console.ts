/**
 * The main class in this package.
 * 
 * @since 0.0.1
 */
export class Console{
  public print(message: unknown, params: { classicParams: unknown[]; }) {
    console.log(message, ...params.classicParams);
  }
}