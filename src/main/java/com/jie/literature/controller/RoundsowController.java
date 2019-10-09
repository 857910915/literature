package com.jie.literature.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import com.jie.literature.domain.Roundsow;
import com.jie.literature.mapper.RoundsowMapper;
import com.jie.literature.service.RoundsowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("round")
public class RoundsowController {
    @Autowired
    private RoundsowService roundsowService;
    @Autowired
    private RoundsowMapper roundsowMapper;
    //上传图片
    @RequestMapping("/toAdd")
    @ResponseBody
    public String toAdd ( Roundsow roundsow, MultipartFile myFile) throws FileNotFoundException {
        String path = ResourceUtils.getURL("classpath:").getPath();
        //创建file对象，指定存储路径
        String msg="";
        File descFile=new File(path+myFile.getOriginalFilename());
        if (!myFile.isEmpty()) { //文件不是空文件
            String uuid = UUID.randomUUID().toString();
            try {
                //保存图片到目录下,建立保存文件的输入流
                BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(new File(path+"static/img/" + uuid + ".jpg")));
                out.write(myFile.getBytes());
                out.flush();
                out.close();
                String filename = "../img/" + uuid + ".jpg";
                roundsow.setRounImg(filename);
                roundsowService.toAdd(roundsow);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
//                return new Reponse(false,"上传失败," + e.getMessage());
                msg="上传失败"+ e.getMessage();
                return JSON.toJSONString(msg);
            } catch (IOException e) {
                e.printStackTrace();
                msg="上传失败"+ e.getMessage();
                return JSON.toJSONString(msg);
            }
            msg="上传图片成功";
        } else {
            msg="上传图片失败，因为文件是空的";
        }
        return JSON.toJSONString(msg);
    }

    @RequestMapping("/toShow")
    @ResponseBody
    public String toShow(int rounStatus,int pageNo,int pageSize){
        PageInfo<Roundsow>pageInfo=new PageInfo<>();
        if (rounStatus==-1){
            pageInfo=roundsowService.toShow(pageNo,pageSize);
        }else {
            pageInfo=roundsowService.toQuery(rounStatus,pageNo,pageSize);
        }

        return JSON.toJSONString(pageInfo.getList());
    }

    @RequestMapping("/toGet")
    @ResponseBody
    public String toGet(){
        List<Roundsow> list=roundsowMapper.toQuery(0);
        return JSON.toJSONString(list);
    }

    @RequestMapping("/toUpdateStatus")
    @ResponseBody
    public String toUpdateStatus(Roundsow roundsow){
        String msg="";
        Roundsow roundsow1=roundsowService.toGetOne(roundsow.getRounId());
        roundsow1.setRounStatus(roundsow.getRounStatus());
        if (roundsow.getRounStatus()==0){
            List<Roundsow> list=roundsowMapper.toQuery(0);
            if (list.size()<5){
                int num=roundsowService.toUpdataStatus(roundsow1);
                if (num>0){
                    msg="上架成功";
                }else {
                    msg="上架失败";
                }
            }else {
                msg="上架图片超过5张，请先下架！";
            }
        }else {
            int num=roundsowService.toUpdataStatus(roundsow1);
            if (num>0){
                msg="修改成功";
            }else {
                msg="修改失败";
            }
        }


        return JSON.toJSONString(msg);
    }

    @RequestMapping("/toDelete")
    @ResponseBody
    public void toDelete(int id){
        roundsowService.toDelete(id);
    }
}
