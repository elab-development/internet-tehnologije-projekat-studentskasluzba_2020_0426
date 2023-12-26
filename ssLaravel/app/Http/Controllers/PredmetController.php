<?php
namespace App\Http\Controllers;

use App\Http\Resources\PredmetResource;
use App\Models\Predmet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PredmetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $predmeti = Predmet::paginate(5);
        return PredmetResource::collection( $predmeti);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'esbp' => 'required|integer',
            'semestar' => 'required|integer',
            'profesor_id' => 'required|exists:profesors,id',
            'tip' => 'required|string|in:obavezan,izborni',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $predmet = Predmet::create($validator->validated());
    
        return new PredmetResource($predmet);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $predmet = Predmet::find($id);

        if (!$predmet) {
            return response()->json(['message' => 'Predmet not found'], 404);
        }

        return new PredmetResource($predmet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $predmet = Predmet::find($id);

        if (!$predmet) {
            return response()->json(['message' => 'Predmet not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'esbp' => 'required|integer',
            'semestar' => 'required|integer',
            'profesor_id' => 'required|exists:profesors,id',
            'tip' => 'required|string|in:obavezan,izborni',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $predmet->update($validator->validated());
    
        return new PredmetResource($predmet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $predmet = Predmet::find($id);

        if (!$predmet) {
            return response()->json(['message' => 'Predmet not found'], 404);
        }

        $predmet->delete();

        return response()->json(['message' => 'Predmet successfully deleted'], 200);
    }
}
