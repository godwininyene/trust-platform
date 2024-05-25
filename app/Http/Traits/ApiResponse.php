<?php

namespace App\Http\Traits;

trait ApiResponse
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse(string $message, $result)
    {
        $response = [
            'success' => true,
            'message' => $message,
            'body'    => $result,
        ];

        return response()->json($response, 200);
    }

    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError(string $errorMessages, $errorPayload = [], int $statusCode = 404)
    {
        $response = [
            'success' => false,
            'message' => $errorMessages,
        ];

        if(!empty($errorPayload)){
            $response['body'] = $errorPayload;
        }

        return response()->json($response, $statusCode);
    }
}

?>
