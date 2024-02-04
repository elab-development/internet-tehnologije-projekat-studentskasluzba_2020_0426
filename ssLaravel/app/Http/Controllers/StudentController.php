<?php

namespace App\Http\Controllers;

use App\Http\Resources\StudentResource;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    { 
        $studenti = Student::paginate(5);
        return StudentResource::collection($studenti);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:students',
            'password' => 'required|string|min:8',
            'jmbg' => 'required|string|size:13|unique:students',
            'adresa' => 'required|string|max:255',
            'kontakt' => 'required|string|max:255',
            'godina' => 'required|integer|min:1',
            'broj' => 'required|string|unique:students',
            'prosek' => 'required|numeric|between:6,10',
            'esbp' => 'required|integer', 
            'trenutnaGodina' => 'required|numeric|between:1,4',
            'upis' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $student = new Student($validator->validated());
        $student->password = Hash::make($request->password);
        $student->save();
    
        return new StudentResource($student);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $s =  Student::find($id);
        return new StudentResource($s);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'ime' => 'required|string|max:255',
            'prezime' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
            'jmbg' => 'required|string|size:13',
            'adresa' => 'required|string|max:255',
            'kontakt' => 'required|string|max:255',
            'godina' => 'required|integer|min:1',
            'broj' => 'required|string',
            'prosek' => 'required|numeric|between:6,10',
            'esbp' => 'required|integer',
            'trenutnaGodina' => 'required|numeric|between:1,4',
            'upis' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
    
        $student = Student::find($id);
         $student->update($validator->validated());
        $student->save();
    
        return new StudentResource($student);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $s =  Student::find($id);
        if($s){
            $s->delete();
            return response()->json(['message' => 'Student successfully deleted'], 200);
        }else{
            return response()->json(['error' => 'Student not found'], 404);
        }
    }
}
