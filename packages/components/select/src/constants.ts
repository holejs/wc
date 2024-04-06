import { RuleMethods, RuleHandler } from '@holejs-ui/theme'

const _requiredHandler: RuleHandler = async ({ el }: any) => {
  const value = el.value

  const message = el.getAttribute('data-error-message-required') || 'This field is required.'

  const isError = Array.isArray(value) ? !value.length : !value

  return isError ? { status: 'invalid', message } : { status: 'complete' }
}

const _minHandler: RuleHandler = async ({ el, input }: any) => {
  const value = el.value

  const min = Number(input.getAttribute('min'))

  const message = el.getAttribute('data-error-message-min') || `You must select at least ${min} options.`

  return value.length < min ? { status: 'invalid', message } : { status: 'complete' }
}

const _maxHandler: RuleHandler = async ({ el, input }: any) => {
  const value = el.value

  const max = Number(input.getAttribute('max'))

  const message = el.getAttribute('data-error-message-max') || `You must select at most ${max} options.`

  return value.length > max ? { status: 'invalid', message } : { status: 'complete' }
}

export const Validations: Partial<Record<RuleMethods, RuleHandler>> = {
  required: _requiredHandler,
  min: _minHandler,
  max: _maxHandler
}
