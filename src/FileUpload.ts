import { html } from '@polymer/lit-element';
import type { TemplateResult } from 'lit-html';

export interface FileUploadProps {
  onChange?: (file: File) => any;
  hideFileUpload?: boolean;
}

export default function FileUpload ({ onChange = (): any => {}, hideFileUpload = false }: FileUploadProps): TemplateResult {
  if (hideFileUpload) {
    return null;
  }

  return html`
    <label for='buv-json-file-upload' class='buv-o-link  buv-o-text-12'>
      <span class='buv-o-link__text--underline'>Upload document</span>
      <input
        type='file'
        accept='application/json'
        id='buv-json-file-upload'
        class='buv-u-visually-hidden'
        onchange='${(e) => { onChange(e.target.files[0]); }}'
      />
    </label>`;
}
