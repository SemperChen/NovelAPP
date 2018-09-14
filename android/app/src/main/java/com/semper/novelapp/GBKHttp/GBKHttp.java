package com.semper.novelapp.GBKHttp;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * GBK转UTF-8
 * Created by semper
 * data: 2017/12/21
 */

class GBKHttp {

    static void getDataGBK(String url,
                           final com.facebook.react.bridge.Callback successCallback,
                           final com.facebook.react.bridge.Callback errorCallback) {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                errorCallback.invoke(e.getMessage());
            }
            @Override
            public void onResponse(Call call, Response response) {
                try {
                    if(response.isSuccessful()){
                        final byte[] responseBytes=response.body().bytes();
                        final String responseUrl = new String(responseBytes,"GBK");
                        successCallback.invoke(responseUrl);
                    }
                }catch (Exception e){
                    errorCallback.invoke(e.getMessage());
                }

            }
        });
    }
}
