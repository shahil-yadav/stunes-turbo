export class SwrRestApiError extends Error {
  constructor() {
    super(
      "SWR API call failed. The request could not be completed. Please review the stack trace for more details",
    );
  }
}

export class ZodParsingError extends Error {
  constructor() {
    super("API response failed due to validation issues");
  }
}
