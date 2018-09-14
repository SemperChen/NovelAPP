package com.semper.novelapp.GBKHttp;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by semper
 * data: 2017/12/21
 */

public class GBKHttpModule extends ReactContextBaseJavaModule {
    GBKHttpModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GBKHttp";
    }

    @ReactMethod
    public void fetchGBKData(
            String url,
            Callback errorCallback,
            Callback successCallback) {
        GBKHttp.getDataGBK(url,successCallback,errorCallback);
    }

}
