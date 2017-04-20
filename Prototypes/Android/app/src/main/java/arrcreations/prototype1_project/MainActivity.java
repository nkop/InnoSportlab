package arrcreations.prototype1_project;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    Button btn_camera;
    Button btn_analyse;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btn_camera = (Button)findViewById(R.id.btn_main_camera);
        btn_analyse = (Button)findViewById(R.id.btn_main_analyse);
        setListeners();
    }

    private void setListeners(){
        //final Intent camera = new Intent(this, CameraActivity.class);
        final Intent camera = new Intent(this, ServerListActivity.class);
        btn_camera.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(camera);
            }
        });
        final Intent analyse = new Intent(this, AnalyseActivity.class);
        btn_analyse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(analyse);
            }
        });
    }
}
