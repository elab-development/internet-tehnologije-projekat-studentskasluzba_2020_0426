<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IspitResource extends JsonResource
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
            'student' => new StudentResource($this->student),
            'predmet' => new PredmetResource($this->predmet),
            'datum' => $this->datum,
            'ocena' => $this->ocena,
            'opisnaOcena' => $this->opisnaOcena,
        ];
    }
}
