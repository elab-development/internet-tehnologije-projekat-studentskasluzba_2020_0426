<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProfesorResource;
use App\Models\Profesor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfesorController extends Controller
{
    public function index()
    {
        return ProfesorResource::collection(Profesor::all());
    }
    public function show($id)
    {
        $profesor = Profesor::find($id);

        if (!$profesor) {
            return response()->json(['message' => 'Profesor not found'], 404);
        }

        return new ProfesorResource($profesor);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:profesors',
            'lozinka' => 'required|string|min:8',
            'jmbg' => 'required|string|size:13|unique:profesors',
            'adresa' => 'required|string|max:255',
            'kontakt' => 'required|string|max:255',
            'titula' => 'required|string|max:255',
            'katedra' => 'required|string|max:255',
            'kabinet' => 'required|string|max:255',
            'konsultacije' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $profesorData = $validator->validated();
        $profesorData['password'] = Hash::make($request->password);
    
        $profesor = new Profesor($profesorData);
        $profesor->save();
    
        return new ProfesorResource($profesor);
    }

    public function update(Request $request, $id)
    {
        $profesor = Profesor::find($id);

        if (!$profesor) {
            return response()->json(['message' => 'Profesor not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'lozinka' => 'required|string|min:8',
            'jmbg' => 'required|string|size:13',
            'adresa' => 'required|string|max:255',
            'kontakt' => 'required|string|max:255',
            'titula' => 'required|string|max:255',
            'katedra' => 'required|string|max:255',
            'kabinet' => 'required|string|max:255',
            'konsultacije' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $profesor->update($validator->validated());

        return new ProfesorResource($profesor);
    }

    public function destroy($id)
    {
        $profesor = Profesor::find($id);

        if (!$profesor) {
            return response()->json(['message' => 'Profesor not found'], 404);
        }

        $profesor->delete();

        return response()->json(['message' => 'Profesor successfully deleted'], 200);
    }

}
