<?php
namespace App\Http\Controllers;

use App\Http\Resources\PredmetResource;
use App\Models\Predmet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
    public function sviPredmetiUlogovanogProfesora()
    {
        $profesor = Auth::user();
    
        if (!$profesor) {
            return response()->json(['message' => 'Niste ulogovani kao profesor.'], 401);
        }
    
        $predmeti = Predmet::where('profesor_id', $profesor->id)->get();
        return PredmetResource::collection($predmeti->map(function ($predmet) {
            return new PredmetResource($predmet);
        }));
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
            'tip' => 'required|string|in:obavezan,izborni',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Dohvatite trenutno ulogovanog profesora
        $profesor = Auth::user();
    
        // Proverite da li je ulogovani korisnik profesor
        if (!$profesor) {
            return response()->json(['message' => 'Niste ulogovani kao profesor.'], 401);
        }
    
        // Dodajte profesor_id na validirane podatke
        $validatedData = $validator->validated();
        $validatedData['profesor_id'] = $profesor->id;
    
        // Kreirajte predmet sa dodatnim profesor_id
        $predmet = Predmet::create($validatedData);
    
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
            'tip' => 'required|string|in:obavezan,izborni',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        // Pomoću Auth funkcije dobijamo trenutnog ulogovanog korisnika
        $korisnik = Auth::user();
        
        // Postavljamo id ulogovanog korisnika kao profesor_id
        $request->merge(['profesor_id' => $korisnik->id]);
    
        $predmet->update($request->only(['naziv', 'esbp', 'semestar', 'tip', 'profesor_id']));
    
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
    public function statistike($id)
    {
        $predmet = Predmet::find($id);
    
        if (!$predmet) {
            return response()->json(['message' => 'Predmet not found'], 404);
        }
    
        // Ocene koje želite da pratite (5 do 10)
        $ocene = range(5, 10);
    
        // Inicijalizujte niz za statistike
        $statistike = [];
    
        // Iterirajte kroz ocene i za svaku ocenu pronađite broj studenata koji su je dobili
        foreach ($ocene as $ocena) {
            $brojStudenata = $predmet->ispiti()->where('ocena', $ocena)->count();
            $statistike[$ocena] = $brojStudenata;
        }
    
        return response()->json(['statistike' => $statistike]);
    }
    
    
}
