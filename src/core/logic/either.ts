/**
 * Represents a failure in an `Either`.
 *
 * This class encapsulates an error or unsuccessful result.
 *
 * @template L - The type of the error value.
 * @template R - The type of the success value.
 */
export class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }

  get force() {
    const val = this.value
    return {
      success() {
        throw new Error('Cannot call success on failure')
      },
      failure() {
        return {
          get value() {
            return val
          },
        }
      },
    }
  }

  forceRight() {
    return {
      get value(): never {
        throw new Error('Cannot call right on left')
      },
    }
  }

  forceLeft() {
    const val = this.value
    return {
      get value() {
        return val
      },
    }
  }
}

/**
 * Represents a successful result in an `Either`.
 *
 * This class encapsulates a value that was returned successfully.
 *
 * @template L - The type of the error value.
 * @template R - The type of the success value.
 */
export class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }

  get force() {
    const val = this.value
    return {
      success() {
        return {
          get value() {
            return val
          },
        }
      },
      failure() {
        throw new Error('Cannot call failure on success')
      },
    }
  }

  forceRight() {
    const val = this.value
    return {
      get value() {
        return val
      },
    }
  }

  forceLeft() {
    return {
      get value(): never {
        throw new Error('Cannot call left on right')
      },
    }
  }
}

/**
 * Represents a value that can be either a failure (`Left`) or a success (`Right`).
 *
 * Commonly used for functional error handling and flow control, replacing `try/catch`
 * or `null`/`undefined` checks.
 *
 * @template L - The type of the error (left) value.
 * @template R - The type of the success (right) value.
 *
 * @example
 * ```ts
 * const result = right<string, number>(42);
 *
 * if (result.isRight()) {
 *   console.log('Success:', result.value); // 42
 * } else {
 *   console.error('Error:', result.value);
 * }
 * ```
 */
export type Either<L, R> = Left<L, R> | Right<L, R>

/**
 * Creates a `Left` instance representing a failure.
 *
 * @param value - The error value.
 * @returns An `Either` representing a failure.
 */
export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

/**
 * Creates a `Right` instance representing a success.
 *
 * @param value - The success value.
 * @returns An `Either` representing a successful result.
 */
export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
