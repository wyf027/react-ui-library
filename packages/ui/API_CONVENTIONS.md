# Nova UI API Conventions

## Controlled/Uncontrolled

- Value model: `value` + `defaultValue` + `onChange`.
- Visibility model: `open` + `defaultOpen` + `onOpenChange`.
- Shared state props: `disabled`, `size`, `status`.

## Form/Table/Toast alignment

- Form field components should expose value-model props and work with both event-first and value-first `onChange`.
- Table interactive state should support controlled and uncontrolled patterns (pagination/sort/filter/selection).
- Toast visibility should use `open/defaultOpen/onOpenChange` naming.

## PR checklist for new/updated components

- [ ] Uses standard controlled/uncontrolled naming.
- [ ] Avoids render-phase state writes.
- [ ] Documents controlled and uncontrolled examples.
- [ ] Adds accessibility labels for interactive controls.
