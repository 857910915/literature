package com.jie.literature.netty.server.handler;

/**
 * @author chenyi
 * @date 2018/3/29 14:42
 */

import com.jie.literature.netty.process.MsgProcessor;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.timeout.IdleStateEvent;
import io.netty.handler.timeout.IdleStateHandler;

import java.util.concurrent.TimeUnit;

/**
 * 心跳检测
 * @author  chenyi
 */

public class ImIdleHandler extends IdleStateHandler implements  ChannelHandler {


    public ImIdleHandler(int readerIdleTimeSeconds, int writerIdleTimeSeconds, int allIdleTimeSeconds) {
        super(readerIdleTimeSeconds, writerIdleTimeSeconds, allIdleTimeSeconds);
    }

    public ImIdleHandler(long readerIdleTime, long writerIdleTime, long allIdleTime, TimeUnit unit) {
        super(readerIdleTime, writerIdleTime, allIdleTime, unit);
    }

    @Override
    public void channelIdle(ChannelHandlerContext ctx, IdleStateEvent e) throws  Exception{
        MsgProcessor process = new MsgProcessor();
        process.logout(ctx.channel());
        ctx.channel().close();
    }
}
