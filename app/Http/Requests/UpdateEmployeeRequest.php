<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'employee_id_number' => [
                'required', 
                'string', 
                'max:50', 
                Rule::unique('employees')->ignore($this->employee)
            ],
            'full_name' => ['required', 'string', 'max:150'],
            'gender' => ['required', 'in:Male,Female'],
            'employment_status' => ['required', 'in:PKWT,PKWTT'],
            'poh_id' => ['required', 'exists:master_poh,id'],
            'level_id' => ['required', 'exists:master_level,id'],
            'join_date' => ['required', 'date'],
            'resign_date' => ['nullable', 'date', 'after_or_equal:join_date'],
            'is_active' => ['boolean']
        ];
    }
    
    protected function prepareForValidation()
    {
        $this->merge([
            'is_active' => $this->input('resign_date') === null
        ]);
    }
}
