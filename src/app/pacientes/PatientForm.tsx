import type { Patient } from './types';

type PatientAction = (formData: FormData) => Promise<void>;

export function PatientForm({ action, patient, submitLabel }: { action: PatientAction; patient?: Patient; submitLabel: string }) {
  return (
    <form action={action} className="form patient-form">
      {patient ? <input type="hidden" name="id" value={patient.id} /> : null}
      <div className="field">
        <label htmlFor="display_name">Nome do paciente <span aria-hidden="true">*</span></label>
        <input id="display_name" name="display_name" required maxLength={100} autoComplete="off" defaultValue={patient?.display_name ?? ''} />
      </div>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="birth_date">Data de nascimento <span className="muted">(opcional)</span></label>
          <input id="birth_date" name="birth_date" type="date" defaultValue={patient?.birth_date ?? ''} />
        </div>
        <div className="field">
          <label htmlFor="color">Cor de identificação <span className="muted">(verde por padrão)</span></label>
          <input id="color" name="color" type="color" className="color-input" defaultValue={patient?.color ?? '#087e67'} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="notes">Observações <span className="muted">(opcional; até 500 caracteres)</span></label>
        <textarea id="notes" name="notes" rows={4} maxLength={500} defaultValue={patient?.notes ?? ''} />
        <span className="small muted">Evite incluir informações desnecessárias. Este campo pode conter dados sensíveis.</span>
      </div>
      <div className="form-actions">
        <button type="submit">{submitLabel}</button>
        <a className="button-link" href="/dashboard/pacientes">Cancelar</a>
      </div>
    </form>
  );
}
