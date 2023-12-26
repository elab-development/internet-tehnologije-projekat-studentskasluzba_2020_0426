<?php

namespace App\Http\Controllers;

use App\Http\Resources\IspitResource;
use App\Models\Ispit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IspitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ispiti = Ispit::paginate(5);
        return IspitResource::collection($ispiti);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:students,id',
            'predmet_id' => 'required|exists:predmets,id',
            'datum' => 'required|date',
            'ocena' => 'required|integer',
            'opisnaOcena' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $ispit = Ispit::create($validator->validated());

        return new IspitResource($ispit);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $ispit = Ispit::find($id);

        if (!$ispit) {
            return response()->json(['message' => 'Ispit not found'], 404);
        }

        return new IspitResource($ispit);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $ispit = Ispit::find($id);

        if (!$ispit) {
            return response()->json(['message' => 'Ispit not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:students,id',
            'predmet_id' => 'required|exists:predmets,id',
            'datum' => 'required|date',
            'ocena' => 'required|integer',
            'opisnaOcena' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $ispit->update($validator->validated());

        return new IspitResource($ispit);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $ispit = Ispit::find($id);

        if (!$ispit) {
            return response()->json(['message' => 'Ispit not found'], 404);
        }

        $ispit->delete();

        return response()->json(['message' => 'Ispit successfully deleted'], 200);
    }


    public function ispitiPoPredmetu($predmet_id)
    {
        $ispiti = Ispit::where('predmet_id', $predmet_id)->get();

        if ($ispiti->isEmpty()) {
            return response()->json(['message' => 'Nema ni jedan ispit'], 404);
        }

        $prosecnaOcena = $ispiti->avg('ocena');

        return response()->json([
            'ispiti' => IspitResource::collection($ispiti),
            'prosecnaOcena' => $prosecnaOcena
        ]);
    }

    public function ispitiPoStudentu($student_id)
    {
        $ispiti = Ispit::where('student_id', $student_id)->get();

        if ($ispiti->isEmpty()) {
            return response()->json(['message' => 'Nema ni jedan ispit'], 404);
        }

        $prosecnaOcena = $ispiti->avg('ocena');

        return response()->json([
            'ispiti' => IspitResource::collection($ispiti),
            'prosecnaOcena' => $prosecnaOcena
        ]);
    }
    public function ispitiPoRoku(Request $request)
    {
         
        $pocetni_datum = $request->input('pocetni_datum');
        $krajnji_datum = $request->input('krajnji_datum');
    
        $ispiti = Ispit::whereBetween('datum', [$pocetni_datum, $krajnji_datum])->get();
    
        return IspitResource::collection($ispiti);
    }
    
}
