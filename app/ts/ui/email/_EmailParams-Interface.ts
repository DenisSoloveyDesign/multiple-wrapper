export default interface EmailParams {
  readonly public: string,
  readonly service: string,
  readonly template: string,
  content: {
    readonly plugin_name: string,
    function_name: string,
    error_message: string,
    error_stack: string,
  },
}