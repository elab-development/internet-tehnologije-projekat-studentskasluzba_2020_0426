<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'ime' => $this->ime,
            'prezime' => $this->prezime,
            'email' => $this->email,
            'jmbg' => $this->jmbg,
            'adresa' => $this->adresa,
            'kontakt' => $this->kontakt,
            'godina' => $this->godina,
            'broj' => $this->broj,
            'prosek' => $this->prosek,
            'esbp' => $this->esbp,
           
        ];
    }
}
